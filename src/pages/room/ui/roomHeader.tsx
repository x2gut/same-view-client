import ReactionButton from "@/features/room/reactions/ui/ReactionButton";
import RoomSettingsModal from "@/features/room/roomSettings/ui/modal/RoomSettingsModal";
import RoomSettingsBtn from "@/features/room/roomSettings/ui/RoomSettingsButton";
import ThemeSwitcher from "@/features/switch-theme/ui/themeSwitcher";
import { Button, CopyBadge } from "@/shared/ui";
import Badge from "@/shared/ui/Badge";
import { MoveLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomHeader = ({
  roomName,
  hostName,
  roomKey,
  isOwner,
}: {
  roomName: string;
  hostName: string;
  roomKey: string;
  isOwner: boolean;
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="border-b border-accent flex justify-between p-5 items-center">
      <div className="flex gap-3 items-center">
        <Button onClick={() => navigate(-1)} variant="ghost" className="px-5">
          <MoveLeft size={20} />
        </Button>
        <h2 className="text-2xl font-semibold">{roomName}</h2>
        <CopyBadge name={roomKey} />
      </div>
      <div className="flex gap-5 items-center">
        <ReactionButton />
        {isOwner && (
          <RoomSettingsBtn
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        )}
        <ThemeSwitcher />
        <Badge
          icon={
            <span className="h-2 w-2 rounded-full bg-green-600 block"></span>
          }
          size="lg"
          shape="pill"
        >
          <span>{`${hostName} ${isOwner ? "(host)" : ""}`}</span>
        </Badge>
      </div>
      <RoomSettingsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </header>
  );
};

export default RoomHeader;
