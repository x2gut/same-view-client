import { create } from "zustand";
import { Reaction } from "./type";

interface ReactionStoreProps {
  reactions: Reaction[];
  setReactions: (newReaction: string) => void;
}

const useReactionStore = create<ReactionStoreProps>((set) => ({
  reactions: [],
  setReactions: (newReaction) =>
    set((state) => {
      const reactionId = crypto.randomUUID();

      setTimeout(() => {
        set((state) => ({
          reactions: state.reactions.filter((r) => r.id !== reactionId),
        }));
      }, 2000);

      return {
        reactions: [...state.reactions, { id: reactionId, emoji: newReaction }],
      };
    }),
}));

export default useReactionStore;
