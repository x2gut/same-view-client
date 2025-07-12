import { useCallback, useRef, useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { voiceChatSocket } from "../api/socket/socket";
import { VoiceChatEvents } from "@/entities/voiceChat/model/events";

const ICE_SERVERS = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const useWebRTC = () => {
  const peerConnections = useRef<Map<string, RTCPeerConnection>>(new Map());
  const localMediaStream = useRef<MediaStream | null>(null);

  const [remoteStreamList, setRemoteStreamList] = useState<
    { userId: string; stream: MediaStream }[]
  >([]);

  const startCaptureSound = useCallback(async () => {
    if (!localMediaStream.current) {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
    }
  }, []);

  const createPeerConnection = useCallback(
    async (peerId: string): Promise<RTCPeerConnection> => {
      await startCaptureSound();

      if (!peerConnections.current.has(peerId)) {
        const pc = new RTCPeerConnection(ICE_SERVERS);

        // Add local tracks
        if (localMediaStream.current) {
          localMediaStream.current.getTracks().forEach((track) => {
            pc.addTrack(track, localMediaStream.current!);
          });
        }

        // Prepare remote stream
        const remoteStream = new MediaStream();
        setRemoteStreamList((prev) => [
          ...prev.filter((item) => item.userId !== peerId), // Remove duplicates
          { userId: peerId, stream: remoteStream },
        ]);

        pc.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
          });
        };

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            voiceChatSocket.emit(VoiceChatEvents.SIGNAL, {
              target: peerId,
              data: event.candidate,
              type: "candidate",
            });
          }
        };

        peerConnections.current.set(peerId, pc);
        return pc;
      }

      return peerConnections.current.get(peerId)!;
    },
    [startCaptureSound]
  );

  const createOffer = async (userId: string) => {
    try {
      const pc = await createPeerConnection(userId);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      voiceChatSocket.emit(VoiceChatEvents.SIGNAL, {
        target: userId,
        data: offer,
        type: "offer",
      });
    } catch (err) {
      console.error("Failed to create offer:", err);
    }
  };

  const handleOffer = async (
    userId: string,
    data: RTCSessionDescriptionInit
  ) => {
    try {
      const pc = await createPeerConnection(userId);
      await pc.setRemoteDescription(new RTCSessionDescription(data));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      voiceChatSocket.emit(VoiceChatEvents.SIGNAL, {
        target: userId,
        data: answer,
        type: "answer",
      });
    } catch (err) {
      console.error("Failed to handle offer:", err);
    }
  };

  const handleAnswer = async (
    userId: string,
    data: RTCSessionDescriptionInit
  ) => {
    try {
      const pc = peerConnections.current.get(userId);
      if (!pc) {
        console.warn("No peer connection found for user:", userId);
        return;
      }

      await pc.setRemoteDescription(new RTCSessionDescription(data));
    } catch (err) {
      console.error("Failed to handle answer:", err);
    }
  };

  const handleIceCandidate = async (userId: string, data: RTCIceCandidate) => {
    try {
      const pc = peerConnections.current.get(userId);
      if (!pc) {
        console.warn("No peer connection found for ICE candidate:", userId);
        return;
      }

      if (pc.remoteDescription) {
        await pc.addIceCandidate(new RTCIceCandidate(data));
      } else {
        console.warn("Cannot add ICE candidate: no remote description set");
      }
    } catch (err) {
      console.error("Failed to add ICE candidate:", err);
    }
  };

  useEffect(() => {
    voiceChatSocket.on(VoiceChatEvents.SIGNAL, async ({ from, data, type }) => {
      if (type === "candidate") {
        await handleIceCandidate(from, data);
      }

      if (type === "answer") {
        await handleAnswer(from, data);
      }

      if (type === "offer") {
        await handleOffer(from, data);
      }
    });

    return () => {
      voiceChatSocket.off(VoiceChatEvents.SIGNAL);
    };
  }, []);

  const removePeer = useCallback((userId: string) => {
    const pc = peerConnections.current.get(userId);
    if (pc) {
      pc.close();
      peerConnections.current.delete(userId);
    }

    setRemoteStreamList((prev) =>
      prev.filter((item) => item.userId !== userId)
    );
  }, []);

  const exitRoom = useCallback(() => {
    peerConnections.current.forEach((pc) => {
      pc.close();
    });
    peerConnections.current.clear();

    setRemoteStreamList([]);

    if (localMediaStream.current) {
      localMediaStream.current.getTracks().forEach((track) => track.stop());
      localMediaStream.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      exitRoom();
    };
  }, [exitRoom]);

  return {
    createOffer,
    handleOffer,
    handleAnswer,
    handleIceCandidate,
    startCaptureSound,
    exitRoom,
    removePeer,
    remoteStreamList,
    localMediaStream,
  };
};

export default useWebRTC;
