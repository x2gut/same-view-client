import { apiClient } from "@/shared/api/rest/client";

const changeVideoUrl = (roomId: string, videoUrl: string, username: string) => {
  return apiClient.post("room/set/video", {
    roomId: roomId,
    videoUrl: videoUrl,
    username: username,
  });
};

export default changeVideoUrl;
