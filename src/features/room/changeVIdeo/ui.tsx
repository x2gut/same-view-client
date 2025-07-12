import useRoomStore from "@/entities/room/model/roomStore";
import { useUserStore } from "@/entities/user/model/userStore";
import checkPermissions from "@/shared/lib/checkPermissions";
import { Button, Input } from "@/shared/ui";
import { Link } from "lucide-react";
import React from "react";

const ChangeVideoInput = ({
  changeVideo,
  roomId,
  username,
}: {
  changeVideo: (
    videoUrl: string | null,
    roomId: string,
    username: string
  ) => string;
  roomId: string;
  username: string;
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { isOwner } = useUserStore();

  return (
    <div className="flex w-full gap-5 p-3">
      <Input
        ref={inputRef}
        containerClassName="w-full"
        className="flex-1"
        fullWidth
        placeholder="Enter Youtube URL"
      />
      <Button
        isDisabled={!checkPermissions(isOwner, "all")}
        onClick={() => {
          changeVideo(inputRef.current.value, roomId, username);
          inputRef.current.value = "";
        }}
        className="flex gap-2 items-center text-nowrap"
      >
        <Link size={15} strokeWidth={1.75} />
        Change Video
      </Button>
    </div>
  );
};

export default ChangeVideoInput;
