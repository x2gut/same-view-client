import { Play, Users, Lock } from "lucide-react";
import HowItWorksCard from "./howItWorksCard";

const HowItWorks = () => {
  return (
    <div className="text-center mt-10">
      <h4 className="font-medium text-2xl mb-10">Features</h4>
      <div className="flex gap-4">
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
