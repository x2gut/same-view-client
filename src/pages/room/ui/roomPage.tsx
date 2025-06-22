import { useLocation, useParams, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import RoomHeader from "./roomHeader";
import useChangeVideo from "@/features/changeVIdeo/model/useChangeVideo";
import Chat from "@/features/chat/ui/Chat";
import { useVideoStore } from "@/entities/video/model/store";
import { useUserStore } from "@/entities/user/model/userStore";
import SystemMessages from "@/features/systemMessages/ui/SystemMeessages";
import RoomVideoViewer from "@/widgets/roomVideoViewer/ui/roomVideoViewer";
import ChangeVideoInput from "@/features/changeVIdeo/ui";
import clsx from "clsx";
import { MessageCircle } from "lucide-react";
import useChatStore from "@/entities/chat/store";
import useMessageStore from "@/entities/message/model/store";

const RoomPage = () => {
  const { isChatVisible, toggleChatVisible } = useChatStore();
  const location = useLocation();
  const params = useParams();
  const { changeVideo } = useChangeVideo();
  const { hasNewMessages, setHasNewMessages } = useMessageStore();
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
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_auto] gap-2 p-2 overflow-hidden">
        <div className="flex flex-col w-full h-full overflow-hidden rounded-lg shadow">
          <RoomVideoViewer youtubeLink={currentVideoUrl} roomId={params.id} />
          <ChangeVideoInput
            roomId={params.id}
            username={username}
            changeVideo={changeVideo}
          />
        </div>
        <SystemMessages />

        {!isChatVisible && (
          <div
            onClick={() => {
              toggleChatVisible();
              setHasNewMessages(false);
            }}
            className="flex items-center justify-center w-12 h-full hover:bg-accent/10 cursor-pointer rounded-md relative"
          >
            <MessageCircle size={28} />
            {hasNewMessages && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse">
                <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
            )}
          </div>
        )}

        <div
          className={clsx(
            "overflow-hidden rounded-lg shadow transition-all duration-500 ease-in-out",
            isChatVisible
              ? "max-w-[400px] opacity-100 translate-x-0 pointer-events-auto"
              : "max-w-0 opacity-0 translate-x-full pointer-events-none"
          )}
        >
          <Chat
            setIsChatVisible={toggleChatVisible}
            username={username}
            roomId={params.id}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
