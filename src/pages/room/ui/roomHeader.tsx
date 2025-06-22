import { Button, CopyBadge } from "@/shared/ui";
import Badge from "@/shared/ui/Badge";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoomHeader = ({
  roomName,
  hostName,
  roomKey,
}: {
  roomName: string;
  hostName: string;
  roomKey: string;
}) => {
  const navigate = useNavigate();

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
        <Badge
          icon={<span className="h-2 w-2 rounded-full bg-green-600 block"></span>}
          size="lg"
          shape="pill"
        >
          {hostName}
        </Badge>
      </div>
    </header>
  );
};

export default RoomHeader;
