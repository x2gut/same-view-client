import JoinRoomModal from "@/features/main/join-room/ui/joinRoomModal";
import Button from "@/shared/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import Input from "@/shared/ui/Input";
import { FC, useRef, useState } from "react";

interface JoinRoomCardProps {
  handleModalOpen: (value: boolean) => void;
}

const JoinRoomCard: FC<JoinRoomCardProps> = ({ handleModalOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Card variant="elevated" className="w-full max-w-[512px]">
        <CardHeader>
          <CardTitle>Join with a room code</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-5 items-center flex-wrap justify-center">
          <Input ref={inputRef} fullWidth placeholder="Enter room code" />
          <Button
            onClick={() => {
              handleModalOpen(true);
              console.log(inputRef.current?.value);
            }}
            className="flex-1"
          >
            Go
          </Button>
        </CardContent>
      </Card>
      <JoinRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        roomKey={inputRef.current?.value}
      />
    </>
  );
};

export default JoinRoomCard;
