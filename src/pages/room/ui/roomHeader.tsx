import { RoomPermissions } from "@/entities/room/model/type";
import ReactionButton from "@/features/room/reactions/ui/ReactionButton";
import RoomSettingsModal from "@/features/room/roomSettings/ui/modal/RoomSettingsModal";
import RoomSettingsBtn from "@/features/room/roomSettings/ui/RoomSettingsButton";
import ThemeSwitcher from "@/features/switch-theme/ui/themeSwitcher";
import checkPermissions from "@/shared/lib/checkPermissions";
import { BurgerButton, Button, CopyBadge, MobileMenu } from "@/shared/ui";
import Badge from "@/shared/ui/Badge";
import { MoveLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomHeader = ({
  roomName,
  hostName,
  roomKey,
  isOwner,
  roomPermissions,
}: {
  roomName: string;
  hostName: string;
  roomKey: string;
  isOwner: boolean;
  roomPermissions: RoomPermissions;
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleOpenMenu = () => {
    setIsMenuOpen((state) => !state);
  };

  return (
    <header className="border-b border-accent flex justify-between p-5 items-center">
      <div className="flex gap-3 items-center">
        <Button onClick={() => navigate(-1)} variant="ghost" className="px-5">
          <MoveLeft size={20} />
        </Button>
        <h2 className="text-2xl font-semibold">{roomName}</h2>
        <CopyBadge name={roomKey} />
      </div>
      {/* Desktop */}
      <div className="flex gap-5 items-center max-md:hidden">
        {roomPermissions.reactions === "enabled" && <ReactionButton />}
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
      {/* Mobile */}
      <BurgerButton onClick={toggleOpenMenu} isMenuOpen={isMenuOpen} />
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <MobileMenu isMenuOpen={isMenuOpen} onClick={toggleOpenMenu}>
        <div className="mt-10 flex flex-col items-center gap-10">
          {roomPermissions.reactions === "enabled" && (
            <div className="flex justify-center w-full border rounded-lg border-border py-3">
              <ReactionButton />
            </div>
          )}
          {isOwner && (
            <RoomSettingsBtn
              onClick={() => {
                setIsModalOpen(true);
              }}
            />
          )}
          <div className="p-4 w-full border-t border-accent">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <ThemeSwitcher />
            </div>
          </div>{" "}
        </div>
      </MobileMenu>
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
