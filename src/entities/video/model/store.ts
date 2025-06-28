import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface VideoStore {
  currentVideoUrl: string;
  setVideoUrl: (url: string) => void;
  timecode: number;
  setTimecode: (timecode: number) => void;
  totalDuration: number;
  setTotalDuration: (duration: number) => void;
  isPaused: boolean;
  setIsPaused: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const useVideoStore = create<VideoStore>()(
  persist(
    (set) => ({
      timecode: 0,
      setTimecode: (timecode) => {
        set({ timecode });
      },
      isFullscreen: document.fullscreenElement ? true : false,
      toggleFullscreen: () =>
        set((state) => ({ isFullscreen: !state.isFullscreen })),
      currentVideoUrl: "",
      setVideoUrl: (url) => set({ currentVideoUrl: url }),
      totalDuration: 0,
      setTotalDuration: (duration) => set({ totalDuration: duration }),
      isPaused: true,
      setIsPaused: (value) => set({ isPaused: value }),
      isLoading: false,
      setIsLoading: (value) => set({ isLoading: value }),
    }),
    {
      name: "videoUrl",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ currentVideoUrl: state.currentVideoUrl }),
    }
  )
);
