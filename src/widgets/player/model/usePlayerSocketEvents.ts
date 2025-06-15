import { createSystemMessage } from "@/entities/message/lib/createSystemMessage";
import useMessageStore from "@/entities/message/model/store";
import useRoomStore from "@/entities/room/model/roomStore";
import { VideoEvents } from "@/entities/video/model/events";
import { useVideoStore } from "@/entities/video/model/store";
import { RoomVideo } from "@/entities/video/model/types";
import { videoSocket } from "@/shared/api/socket/socket";
import { formatTime } from "@/shared/lib/formatTime";
import { RefObject, useEffect } from "react";
import { YoutubeControls } from "react-youtube-light";

interface UsePlayerSocketEventsProps {
  playerControlsRef: RefObject<YoutubeControls>;
}

const usePlayerSocketEvents = ({
  playerControlsRef,
}: UsePlayerSocketEventsProps) => {
  const { addMessage } = useMessageStore();
  const { setTimecode, setIsPaused } = useVideoStore();

  useEffect(() => {
    videoSocket.on(VideoEvents.VIDEO_PAUSED, (data: { username: string }) => {
      const message = createSystemMessage(`${data.username} paused the video.`);
      addMessage(message);
      playerControlsRef.current?.pause();
      setIsPaused(true);
    });

    videoSocket.on(VideoEvents.ON_USER_JOIN, (data: { video: RoomVideo }) => {
      const { timecode } = data.video;
      if (timecode) {
        setTimecode(timecode);
      }
    });

    videoSocket.on(VideoEvents.VIDEO_RESUMED, (data: { username: string }) => {
      const message = createSystemMessage(
        `${data.username} resumed the video.`
      );
      addMessage(message);
      playerControlsRef.current?.play();
      setIsPaused(false);
    });

    videoSocket.on(
      VideoEvents.VIDEO_SEEKED,
      (data: { seconds: number; username: string }) => {
        const { username, seconds } = data;

        playerControlsRef.current?.seekTo(seconds);
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
  }, []);
};

export default usePlayerSocketEvents;
