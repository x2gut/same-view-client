import { Button } from "@/shared/ui";
import { Settings as SettingsIcon } from "lucide-react";

interface RoomSettingsBtnProps {
  onClick: () => void;
}

const RoomSettingsBtn = ({ onClick }: RoomSettingsBtnProps) => {
  return (
    <div>
      <Button
        onClick={onClick}
        variant="ghost"
        className="text-muted hover:text-primary"
        size="small"
      >
        <SettingsIcon className="" size={22} />
      </Button>
    </div>
  );
};

export default RoomSettingsBtn;
