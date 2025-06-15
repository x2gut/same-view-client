import HowItWorksCard from "./howItWorksCard";

const HowItWorks = () => {
  return (
    <div className="text-center mt-10">
      <h4 className="font-medium text-2xl mb-10">How it works</h4>
      <div className="flex gap-4">
        <HowItWorksCard
          title="1"
          label="Create a room"
          description="Start a public or private room where you control the video playback"
        />
        <HowItWorksCard
          title="2"
          label="Invite friends"
          description="Share your room code with friends so they can join the experience"
        />
        <HowItWorksCard
          title="3"
          label="Watch together"
          description="Enjoy synchronized video playback and real-time chat with everyone"
        />
      </div>
    </div>
  );
};

export default HowItWorks;
