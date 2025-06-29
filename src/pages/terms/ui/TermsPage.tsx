import { Button } from "@/shared/ui";
import {
  buttonVariants,
  containerVariants,
  itemVariants,
} from "@/shared/ui/animations";
import { Card, CardContent } from "@/shared/ui/Card";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsPage = () => {
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
          Terms of Service
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
                <h3 className="font-bold text-3xl">1. Acceptance of Terms </h3>
                <p className="text-muted">
                  By accessing and using SyncViewRoom, you acknowledge that you
                  have read, understood, and agree to be bound by these Terms of
                  Service. If you do not agree with these terms, please do not
                  use our platform.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col gap-3"
                variants={itemVariants}
              >
                <h3 className="font-bold text-3xl">2. User Responsibilities</h3>
                <p className="text-muted">
                  Users are responsible for all content shared within their
                  rooms. This includes ensuring that all shared videos comply
                  with copyright laws and do not contain illegal material.
                  SyncViewRoom does not host any video content directly and
                  serves only as a synchronization platform.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col gap-3"
                variants={itemVariants}
              >
                <h3 className="font-bold text-3xl">3. Privacy Policy</h3>
                <p className="text-muted">
                  We respect your privacy and are committed to protecting your
                  personal information. Our Privacy Policy explains how we
                  collect, use, and safeguard your data when you use our
                  platform.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col gap-3"
                variants={itemVariants}
              >
                <h3 className="font-bold text-3xl">4. Disclaimers</h3>
                <p className="text-muted">
                  SyncViewRoom is provided "as is" without warranties of any
                  kind. We do not guarantee uninterrupted or error-free service,
                  and are not responsible for the content shared by users.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col gap-3"
                variants={itemVariants}
              >
                <h3 className="font-bold text-3xl">5. Modifications</h3>
                <p className="text-muted">
                  We reserve the right to modify these terms at any time.
                  Continued use of SyncViewRoom after changes constitutes
                  acceptance of the updated terms.
                </p>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TermsPage;
