import { SettingOption } from "@/entities/room/model/type";
import { Badge } from "@/shared/ui";

interface SettingOptionCardProps {
  option: SettingOption;
  isSelected: boolean;
  onSelect: () => void;
}

const OptionCard = ({
  option,
  isSelected,
  onSelect,
}: SettingOptionCardProps) => {
  const Icon = option.icon;

  return (
    <div
      className={`flex items-center p-3 w-full rounded-lg border-2 cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-primary bg-primary/10 shadow-md"
          : "border-border hover:border-primary/50 hover:bg-primary/5"
      }`}
      onClick={onSelect}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div
            className={`p-1 rounded-md ${
              isSelected ? "bg-primary/20" : "bg-muted/10"
            }`}
          >
            <Icon className={option.iconColor} size={20} />
          </div>
          <div>
            <p
              className={`font-medium ${
                isSelected ? "text-primary" : "text-foreground"
              }`}
            >
              {option.label}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {option.recommended && (
            <Badge className="bg-warning/10 text-warning">Recommended</Badge>
          )}
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              isSelected ? "border-primary bg-primary" : "border-gray-300"
            }`}
          >
            {isSelected && (
              <div className="w-2 h-2 bg-white rounded-full"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionCard;
