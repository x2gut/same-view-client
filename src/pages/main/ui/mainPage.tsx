import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Users } from "lucide-react";
import { Container } from "@/shared/ui";
import Button from "@/shared/ui/Button";
import {
  buttonVariants,
  containerVariants,
  itemVariants,
  titleVariants,
} from "../../../shared/ui/animations";
import { HowItWorks, JoinRoomCard, Rooms } from "./components";
import { Header, Footer } from "@/widgets";
import CreateRoomModal from "@/features/main/create-room/ui/createRoomModal";
import JoinRoomModal from "@/features/main/join-room/ui/joinRoomModal";

const MainPage = () => {
  const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState(false);

  const rooms = JSON.parse(localStorage.getItem("rooms")) || [];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
      </motion.div>

      <motion.main
        className="py-10 px-2"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Container>
          <motion.div
            className="flex flex-col items-center gap-5"
            variants={containerVariants}
          >
            <motion.h2
              className="text-6xl font-semibold mb-5 text-center"
              variants={titleVariants}
            >
              Watch Together,
              <br /> No Matter Where
            </motion.h2>

            <motion.p
              className="text-gray-500 text-xl mb-5 text-center"
              variants={itemVariants}
            >
              Perfectly synchronized video streaming with friends and family.
              <br />
              Share moments, even when you're apart.
            </motion.p>

            <motion.div
              className="flex gap-10 mb-5 flex-wrap items-center justify-center"
              variants={containerVariants}
            >
              <motion.div variants={buttonVariants}>
                <Button
                  onClick={() => setCreateRoomModalOpen(true)}
                  size="large"
                  variant="primary"
                  className="flex items-center gap-6 px-10"
                >
                  <Plus />
                  Create a Room
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants}>
                <Button
                  onClick={() => setIsJoinRoomModalOpen(true)}
                  size="large"
                  variant="secondary"
                  className="flex items-center gap-6 px-10"
                >
                  <Users />
                  Join a Room
                </Button>
              </motion.div>

              <CreateRoomModal
                isOpen={isCreateRoomModalOpen}
                onClose={() => setCreateRoomModalOpen(false)}
              />
              <JoinRoomModal
                isOpen={isJoinRoomModalOpen}
                onClose={() => setIsJoinRoomModalOpen(false)}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <JoinRoomCard handleModalOpen={setIsJoinRoomModalOpen} />
            </motion.div>
          </motion.div>
        </Container>

        {rooms.length >= 1 && (
          <Rooms rooms={rooms} className="my-10 py-10" />
        )}

        <Container>
          <motion.div
            className="flex flex-col items-center gap-5"
            variants={itemVariants}
          >
            <HowItWorks />
          </motion.div>
        </Container>
      </motion.main>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Footer />
      </motion.div>
    </>
  );
};

export default MainPage;
