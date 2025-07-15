import { Badge, Button } from "@/shared/ui";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "@/shared/ui/modal";
import clsx from "clsx";
import {
  HeadphoneOff,
  Headphones,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Users,
} from "lucide-react";
import { FC } from "react";
import useVoiceChat from "../model/useVoiceChat";

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceModal: FC<VoiceModalProps> = ({ isOpen, onClose }) => {
  const {
    users,
    isConnected,
    renderUserBadge,
    handleVoiceChatConnection,
    voiceSettings,
    voiceSettingsActions,
  } = useVoiceChat();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        className="text-heading text-2xl font-semibold"
        onClose={onClose}
        showCloseButton
      >
        Voice Chat
      </ModalHeader>
      <ModalBody>
        <h4 className="text-muted flex items-center gap-3 text-xl font-medium mb-5">
          <Users />
          Participants ({users.length})
        </h4>

        <ul>{users.map((user) => renderUserBadge(user))}</ul>
      </ModalBody>
      <ModalFooter className="flex flex-col gap-3">
        <div className="flex justify-between">
          <span className="text-muted">Status: {isConnected}</span>
          <Badge
            className={clsx(
              "text-amber-50",
              isConnected ? "bg-success" : "bg-error"
            )}
          >
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
        


        {!isConnected ? (
          <div className="w-full flex flex-col justify-center">
            <Button
              onClick={() => {
                handleVoiceChatConnection();
              }}
              className="flex items-center justify-center gap-2 flex-1 bg-success"
              size="small"
            >
              <Phone size={14} />
              Join Voice Chat
            </Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => {
                handleVoiceChatConnection();
              }}
              size="small"
              variant="custom"
              className="flex items-center justify-center gap-3 w-full bg-error my-3"
            >
              <PhoneOff size={16} />
              Disconnect
            </Button>
            <div className="flex gap-5">
              <Button
                onClick={
                  voiceSettings.isMuted
                    ? voiceSettingsActions.handleUnMute
                    : voiceSettingsActions.handleMute
                }
                variant="secondary"
                className="flex items-center gap-2 flex-1"
                size="small"
              >
                {voiceSettings.isMuted ? (
                  <MicOff size={18} />
                ) : (
                  <Mic size={18} />
                )}
                {voiceSettings.isMuted ? "Unmute" : "Mute"}
              </Button>
              <Button
                onClick={
                  voiceSettings.isDeaf
                    ? voiceSettingsActions.handleUnDeaf
                    : voiceSettingsActions.handleDeaf
                }
                variant="secondary"
                className="flex items-center gap-2 flex-1"
                size="small"
              >
                {voiceSettings.isDeaf ? (
                  <HeadphoneOff size={18} />
                ) : (
                  <Headphones size={18} />
                )}
                Turn {voiceSettings.isDeaf ? "on" : "off"} Sounds
              </Button>
            </div>
          </div>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default VoiceModal;