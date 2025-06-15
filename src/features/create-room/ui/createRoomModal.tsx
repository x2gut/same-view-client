import useCreateRoom from "@/features/create-room/model/useCreateRoom";
import { Button, Input, Switch } from "@/shared/ui";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "@/shared/ui/modal";
import { useState } from "react";
import { Form } from "react-router-dom";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRoomModal = ({ isOpen, onClose }: CreateRoomModalProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const { createRoom, register, errors, handleSubmit } = useCreateRoom();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose} showCloseButton>
        Create a Room
      </ModalHeader>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(createRoom)();
        }}
      >
        <ModalBody className="flex flex-col gap-5">
          <Input
            {...register("username", {
              required: "This field is required",
              minLength: {
                value: 4,
                message: "Username must be at least 4 characters long",
              },
            })}
            fullWidth
            label="Your username"
            placeholder="Enter your username"
            error={String(
              errors.username?.message ? errors.username?.message : ""
            )}
          />
          <Input
            {...register("roomName", {
              required: "This field is required",
              minLength: {
                value: 4,
                message: "Room name must be at least 4 characters long",
              },
            })}
            fullWidth
            label="Room Name"
            placeholder="Enter a room name"
            error={String(
              errors.roomName?.message ? errors.roomName?.message : ""
            )}
          />
          <div className="flex justify-between">
            <div className="flex gap-1 flex-col">
              <label className="text-sm" htmlFor="requirePassword">
                Private Room
              </label>
              <p className="text-sm text-gray-500">
                Require a password to join
              </p>
            </div>
            <Switch
              id="requirePassword"
              size="md"
              isChecked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
          </div>
          {isChecked && (
            <Input
              hint="Password must be at least 8 characters long"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              fullWidth
              label="Room Password"
              placeholder="Enter a password"
              type="password"
              error={String(
                errors.password?.message ? errors.password?.message : ""
              )}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button className="w-full">Create Room</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default CreateRoomModal;
