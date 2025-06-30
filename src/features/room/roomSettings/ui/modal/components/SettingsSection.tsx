import { SettingOption } from "@/entities/room/model/type";
import OptionCard from "./OptionCard";
import SettingSectionHeader from "./SettingsSectionHeader";

interface SettingSectionProps {
  type: "video" | "playback";
  icon: React.ReactNode;
  title: string;
  description: string;
  options: SettingOption[];
  selectedValue: string;
  onSelectionChange: (key: string, value: string) => void;
}

const SettingSection = ({
  type,
  icon,
  title,
  description,
  options,
  selectedValue,
  onSelectionChange,
}: SettingSectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <SettingSectionHeader
        icon={icon}
        title={title}
        description={description}
      />
      <div className="space-y-2">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            option={option}
            isSelected={selectedValue === option.value}
            onSelect={() => {
              onSelectionChange(type, option.value);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingSection;
