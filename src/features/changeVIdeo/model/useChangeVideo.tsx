import { useEffect } from "react";
import changeVideoUrl from "../api/rest/changeVideo";
import { createSystemMessage } from "@/entities/message/lib/createSystemMessage";
import useMessageStore from "@/entities/message/model/store";
import { setVideo } from "../api/socket/handlers";
import { videoSocket } from "@/shared/api/socket/socket";
import { useVideoStore } from "@/entities/video/model/store";
import { VideoEvents } from "@/entities/video/model/events";

const useChangeVideo = () => {
  const { addMessage } = useMessageStore();
  const { setVideoUrl } = useVideoStore();

  const changeVideo = (
    videoUrl: string | null,
    roomId: string,
    username: string
  ) => {
    if (!videoUrl) return;

    setVideoUrl(videoUrl);

    //REST
    changeVideoUrl(roomId, videoUrl, username);

    //WS
    setVideo(videoUrl, roomId);

    const videoChangedMessage = createSystemMessage(
      `${username} has changed the video`
    );
    addMessage(videoChangedMessage);

    return videoUrl;
  };

  useEffect(() => {
    videoSocket.on(VideoEvents.VIDEO_CHANGED, (data: { videoUrl: string }) => {
      setVideoUrl(data.videoUrl);
    });

    return () => {
      videoSocket.off(VideoEvents.VIDEO_CHANGED);
    };
  }, []);

  return { changeVideo };
};

export default useChangeVideo;
