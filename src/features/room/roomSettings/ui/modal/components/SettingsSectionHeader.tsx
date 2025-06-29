interface SettingSectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SettingSectionHeader = ({
  icon,
  title,
  description,
}: SettingSectionHeaderProps) => {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted text-sm">{description}</p>
      </div>
    </div>
  );
};

export default SettingSectionHeader;
