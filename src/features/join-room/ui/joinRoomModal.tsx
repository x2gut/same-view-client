import { Button, Input } from "@/shared/ui";
import Modal, { ModalBody, ModalHeader } from "@/shared/ui/modal";
import { FC, useEffect } from "react";
import { Form } from "react-router-dom";
import useJoinRoom from "../model/useJoinRoom";

interface JoinRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomKey?: string;
}

const JoinRoomModal: FC<JoinRoomModalProps> = ({
  isOpen,
  onClose,
  roomKey = "",
}) => {
  const { register, handleSubmit, joinRoom, reset } = useJoinRoom();

  useEffect(() => {
    if (roomKey) {
      reset({ roomKey });
    }
  }, [roomKey, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Join Room</ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(joinRoom)();
          }}
        >
          <div className="flex flex-col gap-2 w-full">
            <Input
              {...register("username")}
              fullWidth
              placeholder="Enter your username"
              label="Username"
            />
            <Input
              {...register("roomKey")}
              fullWidth
              placeholder="Enter room key"
              label="Room Key"
              value={roomKey}
            />
            <Input
              {...register("password")}
              variant="filled"
              fullWidth
              placeholder="Enter room password"
              label="Password"
              hint="Optional (Only if needed)"
            />
            <Button type="submit">Join the Room</Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default JoinRoomModal;
