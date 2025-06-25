import { motion } from "framer-motion";
import { Button } from "@/shared/ui";
import { Card, CardContent } from "@/shared/ui/Card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  buttonVariants,
  containerVariants,
  itemVariants,
  titleVariants,
} from "@/shared/ui/animations";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="py-14 max-w-6xl mx-auto px-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mx-auto max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={buttonVariants}>
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft />
            Back to Home
          </Button>
        </motion.div>

        <h2 className="mt-10 text-heading font-bold text-3xl">
          About SameView
        </h2>
        <Card variant="elevated" className="mt-10 max-w-4xl">
          <CardContent>
            <motion.div
              className="flex flex-col gap-5"
              animate="visible"
              initial="hidden"
              variants={containerVariants}
            >
              <motion.div
                className="flex flex-col gap-3"
                variants={itemVariants}
              >
                <h3 className="font-bold text-3xl">Our Mission</h3>
                <p className="text-muted">
                  SyncViewRoom was created with a simple goal: to bring people
                  together through shared viewing experiences. We believe that
                  watching videos together, even when physically apart,
                  strengthens connections and creates memorable moments.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col gap-3"
                variants={itemVariants}
              >
                <h3 className="font-bold text-3xl">How It Works</h3>
                <p className="text-muted">
                  Our platform synchronizes video playback across multiple
                  devices, ensuring everyone sees the same content at the same
                  time. Combined with our real-time chat feature, it's the next
                  best thing to being in the same room.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col gap-3"
                variants={itemVariants}
              >
                <h3 className="font-bold text-3xl">Our Team</h3>
                <p className="text-muted">
                  SyncViewRoom is developed by a passionate team of developers
                  who believe in the power of shared experiences. We're
                  constantly working to improve our platform and add new
                  features to enhance your viewing experience.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col gap-3"
                variants={itemVariants}
              >
                <h3 className="font-bold text-3xl">Contact Us</h3>
                <p className="text-muted">
                  We'd love to hear from you! If you have any questions,
                  suggestions, or feedback, please reach out to us
                  atcontact@syncviewroom.com
                </p>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;
