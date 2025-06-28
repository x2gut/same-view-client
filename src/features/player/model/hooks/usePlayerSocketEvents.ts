import { createSystemMessage } from "@/entities/message/lib/createSystemMessage";
import useMessageStore from "@/entities/message/model/store";
import { Player } from "@/entities/player/model/types";
import { VideoEvents } from "@/entities/video/model/events";
import { useVideoStore } from "@/entities/video/model/store";
import { RoomVideo } from "@/entities/video/model/types";
import { videoSocket } from "@/shared/api/socket/socket";
import formatTime from "@/shared/lib/formatTime";
import { useEffect, useRef } from "react";

const usePlayerSocketEvents = (player: Player) => {
  const { addMessage } = useMessageStore();
  const { setTimecode, setIsPaused, setIsLoading } = useVideoStore();
  const timecodeBuffer = useRef<number | null>(null);

  useEffect(() => {
    const bufferedTimecode = timecodeBuffer.current;
    if (player && bufferedTimecode) {
      player.seekTo(bufferedTimecode);
      player.pause();
      timecodeBuffer.current = null;
    }
  }, [player]);

  useEffect(() => {
    videoSocket.on(VideoEvents.VIDEO_PAUSED, (data: { username: string }) => {
      const message = createSystemMessage(`${data.username} paused the video.`);
      addMessage(message);
      player.pause();
      setIsPaused(true);
    });

    videoSocket.on(VideoEvents.ON_USER_JOIN, (data: { video: RoomVideo }) => {
      const { timecode } = data.video;
      if (!timecode) return;

      if (!player) {
        timecodeBuffer.current = timecode;
      }

      setTimecode(timecode);
      player.seekTo(timecode);
    });

    videoSocket.on(VideoEvents.VIDEO_RESUMED, (data: { username: string }) => {
      const message = createSystemMessage(
        `${data.username} resumed the video.`
      );
      addMessage(message);
      player.play();
      setIsPaused(false);
    });

    videoSocket.on(
      VideoEvents.VIDEO_SEEKED,
      (data: { seconds: number; username: string }) => {
        const { username, seconds } = data;

        player.seekTo(seconds);
        setIsLoading(false);
        const message = createSystemMessage(
          `${username} seeked to ${formatTime(seconds)}`
        );
        addMessage(message);
      }
    );

    return () => {
      videoSocket.off(VideoEvents.VIDEO_PAUSED);
      videoSocket.off(VideoEvents.VIDEO_RESUMED);
      videoSocket.off(VideoEvents.VIDEO_SEEKED);
      videoSocket.off(VideoEvents.ON_USER_JOIN);
    };
  }, [player]);
};

export default usePlayerSocketEvents;
