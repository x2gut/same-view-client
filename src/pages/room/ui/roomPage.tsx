import { useLocation, useParams, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import RoomHeader from "./roomHeader";
import { useVideoStore } from "@/entities/video/model/store";
import { useUserStore } from "@/entities/user/model/userStore";
import RoomVideoViewer from "@/widgets/roomVideoViewer/ui/roomVideoViewer";
import clsx from "clsx";
import { MessageCircle } from "lucide-react";
import useChatStore from "@/entities/chat/store";
import useMessageStore from "@/entities/message/model/store";
import useChangeVideo from "@/features/room/changeVIdeo/model/useChangeVideo";
import ChangeVideoInput from "@/features/room/changeVIdeo/ui";
import Chat from "@/features/room/chat/ui/Chat";

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
      <div className="flex-1 overflow-hidden p-2">
        <div className="h-full lg:grid lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-2 flex flex-col gap-2">
          <div className="flex flex-col w-full flex-1 overflow-hidden rounded-lg shadow">
            <RoomVideoViewer videoLink={currentVideoUrl} roomId={params.id} />
            <ChangeVideoInput
              roomId={params.id}
              username={username}
              changeVideo={changeVideo}
            />
          </div>

          {!isChatVisible && (
            <div
              onClick={() => {
                toggleChatVisible();
                setHasNewMessages(false);
              }}
              className="flex items-center justify-center px-4 max-lg:max-h-[80px] hover:bg-accent/10 cursor-pointer rounded-md relative"
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
              "overflow-hidden rounded-lg shadow h-full max-lg:max-h-[360px] min-w-[360px]",
              isChatVisible
                ? "translate-x-0 pointer-events-auto"
                : "pointer-events-none hidden"
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
    </div>
  );
};

export default RoomPage;
