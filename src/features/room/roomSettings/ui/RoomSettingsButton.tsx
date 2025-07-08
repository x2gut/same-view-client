import { Button } from "@/shared/ui";
import { ButtonProps } from "@/shared/ui/Button";
import { Settings as SettingsIcon } from "lucide-react";

interface RoomSettingsBtnProps extends ButtonProps {
  onClick: () => void;
}

const RoomSettingsBtn = ({ onClick, ...rest }: RoomSettingsBtnProps) => {
  return (
    <Button {...rest} onClick={onClick} variant="ghost" size="small">
      <SettingsIcon size={22} />
    </Button>
  );
};

export default RoomSettingsBtn;
