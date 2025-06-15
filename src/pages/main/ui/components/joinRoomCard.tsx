import JoinRoomModal from "@/features/join-room/modal/joinRoomModal";
import Button from "@/shared/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import Input from "@/shared/ui/Input";
import { useRef, useState } from "react";

const JoinRoomCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [roomKey, setRoomKey] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleModalClose = () => {
    if (inputRef.current?.value) inputRef.current.value = "";
    setIsOpen(false);
    setRoomKey("");
  };

  const handleGo = () => {
    const value = inputRef.current.value ?? "";
    setRoomKey(value);
    console.log(roomKey);
    setIsOpen(true);
  };

  return (
    <Card variant="elevated" className="w-full max-w-[512px]">
      <CardHeader>
        <CardTitle>Join with a room code</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-[1fr_auto] gap-2 w-full">
        <Input ref={inputRef} fullWidth placeholder="Enter room code" />
        <Button onClick={handleGo} className="flex-none">
          Go
        </Button>
      </CardContent>
      <JoinRoomModal
        isOpen={isOpen}
        onClose={handleModalClose}
        roomKey={roomKey}
      />
    </Card>
  );
};

export default JoinRoomCard;
