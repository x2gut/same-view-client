import Modal, { ModalBody, ModalHeader } from "@/shared/ui/modal";
import { Shield } from "lucide-react";
import { useRoomSettings } from "../../model/useRoomSettings";
import SettingSection from "./components/SettingsSection";
import { playbackOptions, reactionsOptions, videoOptions } from "../../model/consts";

interface RoomSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RoomSettingsModal = ({ isOpen, onClose }: RoomSettingsModalProps) => {
  const {
    roomPermissions,
    handleChangeRoomPermission,
    getVideoSectionIcon,
    getPlaybackSectionIcon,
    getReactionsIcon,
  } = useRoomSettings();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader showCloseButton className="bg-primary/10 flex items-center">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-primary/20 p-2 rounded-md">
              <Shield />
            </div>
            <h3 className="font-semibold text-2xl">Room Settings</h3>
          </div>
          <p className="text-sm text-muted">
            Manage permissions of participants
          </p>
        </div>
      </ModalHeader>
      <ModalBody className="space-y-10">
        <SettingSection
          type="video"
          icon={getVideoSectionIcon()}
          title="Change Video"
          description="Manage who can change the room's video"
          options={videoOptions}
          selectedValue={roomPermissions.video}
          onSelectionChange={handleChangeRoomPermission}
        />
        <SettingSection
          type="playback"
          icon={getPlaybackSectionIcon()}
          title="Playback Control"
          description="Manage who can pause, play, and seek the video"
          options={playbackOptions}
          selectedValue={roomPermissions.playback}
          onSelectionChange={handleChangeRoomPermission}
        />
        <SettingSection
          type="reactions"
          icon={getReactionsIcon()}
          title="Reactions access"
          description="Disable or enable access to reactions"
          options={reactionsOptions}
          selectedValue={String(roomPermissions.reactions)}
          onSelectionChange={handleChangeRoomPermission}
        />
      </ModalBody>
    </Modal>
  );
};

export default RoomSettingsModal;
