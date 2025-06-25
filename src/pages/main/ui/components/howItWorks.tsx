import { Play, Users, Lock, Rocket } from "lucide-react";
import HowItWorksCard from "./howItWorksCard";

const HowItWorks = () => {
  return (
    <div className="text-center mt-10 mx-auto">
      <div className="mb-10 flex items-center gap-3 justify-center">
        <Rocket />

        <h4 className="font-medium text-2xl">Features</h4>
      </div>
      <div className="flex gap-4 flex-wrap items-center justify-center">
        <HowItWorksCard
          title={<Play />}
          label="Sync view"
          description="Watch the video simultaneously with all participants in the room"
        />
        <HowItWorksCard
          title={<Users />}
          label="Live Chat"
          description="Chat with friends while watching in real time"
        />
        <HowItWorksCard
          title={<Lock />}
          label="Private rooms"
          description="Create private rooms with a password for a small circle of friends"
        />
      </div>
    </div>
  );
};

export default HowItWorks;
