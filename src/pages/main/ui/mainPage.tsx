import { Container, Header } from "@/shared/ui";
import Button from "@/shared/ui/Button";
import JoinRoomCard from "./components/joinRoomCard";
import HowItWorks from "./components/howItWorks";
import { useState } from "react";
import JoinRoomModal from "@/features/join-room/modal/joinRoomModal";
import { motion } from "framer-motion";
import {
  buttonVariants,
  containerVariants,
  itemVariants,
  titleVariants,
} from "./animations";
import Footer from "@/widgets/footer/ui/Footer";
import CreateRoomModal from "@/features/create-room/ui/createRoomModal";

const MainPage = () => {
  const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState(false);

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
        className="py-10"
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
              className="text-6xl font-semibold mb-5"
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
              className="flex gap-10 mb-5"
              variants={containerVariants}
            >
              <motion.div variants={buttonVariants}>
                <Button
                  onClick={() => setCreateRoomModalOpen(true)}
                  size="large"
                  variant="primary"
                >
                  Create a Room
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants}>
                <Button
                  onClick={() => setIsJoinRoomModalOpen(true)}
                  size="large"
                  variant="secondary"
                >
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
              <JoinRoomCard />
            </motion.div>

            <motion.div variants={itemVariants}>
              <HowItWorks />
            </motion.div>
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
