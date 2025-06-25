import clsx from "clsx";
import { Play, Lock, LockOpen } from "lucide-react";
import { motion } from "framer-motion";

import { RoomLocalStorage } from "@/entities/room/model/type";
import { Badge, Button, Container, CopyBadge } from "@/shared/ui";
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import {
  containerVariants,
  itemVariants,
} from "../../../../shared/ui/animations";
import { useRef, useState } from "react";
import JoinRoomModal from "@/features/room/join-room/ui/joinRoomModal";

const Rooms = ({
  rooms,
  className,
}: {
  rooms: RoomLocalStorage[];
  className?: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const roomKeyRef = useRef<string>("");

  return (
    <section className={clsx("bg-card/10", className)}>
      <Container>
        <div className="w-full px-3">
          <h2 className="text-4xl font-bold">My Rooms</h2>
          <p className="py-5 text-muted">Quick access to your 3 recent rooms</p>
          <motion.div
            className="flex justify-between gap-10 items-center flex-wrap"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {rooms.map((val) => (
              <motion.div
                key={val.roomKey}
                className="flex-1 hover:scale-105 duration-200"
                variants={itemVariants}
              >
                <Card
                  className="flex-1  min-w-56 max-w-[372px]"
                  variant="elevated"
                >
                  <CardHeader className="flex justify-between text-lg items-center font-bold">
                    {val.roomName}
                    <Play size={20} color="var(--primary)" />
                  </CardHeader>
                  <CardContent className="pt-3 flex flex-col gap-3">
                    <CopyBadge name={val.roomKey} />
                    <div className="flex justify-between items-center">
                      <Badge
                        icon={
                          val.isPrivate ? (
                            <Lock size={18} />
                          ) : (
                            <LockOpen size={18} />
                          )
                        }
                        shape="rounded"
                        outline
                        size="sm"
                        className={clsx(
                          "gap-2 px-4",
                          val.isPrivate
                            ? "border-error text-error"
                            : "border-primary text-primary"
                        )}
                      >
                        {val.isPrivate ? "Private" : "Public"}
                      </Badge>
                      <p className="text-gray-500 text-sm">
                        {new Date(val.createdAt).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </p>
                    </div>
                    <Button
                      className="mt-3 w-full"
                      onClick={() => {
                        roomKeyRef.current = val.roomKey;
                        setIsModalOpen(true);
                      }}
                    >
                      Join the room
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <JoinRoomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          roomKey={roomKeyRef.current}
        />
      </Container>
    </section>
  );
};

export default Rooms;
