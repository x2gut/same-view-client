import useVoiceChatStore from "@/entities/voiceChat/model/store";
import { Badge, Button } from "@/shared/ui";
import { Divide, Plus, Users } from "lucide-react";
import { FC } from "react";

interface JoinVoiceButtonProps {
  onClick: () => void;
}

const JoinVoiceButton: FC<JoinVoiceButtonProps> = ({ onClick }) => {
  const { isConnected, users } = useVoiceChatStore();

  return (
    <>
      {!isConnected ? (
        <Button
          onClick={onClick}
          variant="ghost"
          className="flex items-center gap-2 text-success"
        >
          <Plus size={18} />
          Voice Chat
        </Button>
      ) : (
        <Badge
          onClick={onClick}
          className="bg-success/90 flex gap-2 items-center"
          size="lg"
          shape="pill"
        >
          Connected{" "}
          <div className="flex items-center gap-1">
            <Users size={16} /> {users.length}
          </div>
        </Badge>
      )}
    </>
  );
};

export default JoinVoiceButton;
