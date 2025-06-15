import { useLocation, useParams, Navigate } from "react-router-dom";
import RoomHeader from "./roomHeader";
import RoomVideoViewer from "../../../features/roomVideoViewer/ui/roomVideoViewer";
import RoomVideoInput from "@/features/changeVIdeo/ui";
import useChangeVideo from "@/features/changeVIdeo/model/useChangeVideo";
import Chat from "@/features/chat/ui/Chat";
import toast from "react-hot-toast";
import { useVideoStore } from "@/entities/video/model/store";
import { useUserStore } from "@/entities/user/model/userStore";
import SystemMessages from "@/features/systemMessages/ui/SystemMeessages";

const RoomPage = () => {
  const location = useLocation();
  const params = useParams();
  const { changeVideo } = useChangeVideo();
  const { username } = useUserStore();
  const { currentVideoUrl } = useVideoStore();

  const { roomName, roomKey } = location.state || {};

  if (!roomKey) {
    toast.error("Room key was not provided!");
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <RoomHeader roomKey={roomKey} roomName={roomName} hostName={username} />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[4fr_1fr] md:grid-cols-[3fr_1fr] overflow-hidden gap-2 p-2">
        <div className="flex flex-col w-full h-full overflow-hidden rounded-lg shadow">
          <RoomVideoViewer youtubeLink={currentVideoUrl} roomId={params.id} />
          <RoomVideoInput
            roomId={params.id}
            username={username}
            changeVideo={changeVideo}
          />
        </div>
        <SystemMessages />
        <div className="w-full h-full overflow-hidden rounded-lg shadow">
          <Chat username={username} roomId={params.id} />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
