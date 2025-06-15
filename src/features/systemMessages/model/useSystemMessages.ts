import { SystemMessage } from "@/entities/message/model/type";
import { useEffect, useRef, useState } from "react";

const useSystemMessages = ({ messages }: { messages: SystemMessage[] }) => {
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setNotificationIndex(messages.length - 1);
      setIsVisible(true);
      setProgress(0);
    }
  }, [messages.length]);

  useEffect(() => {
    if (isVisible && !isHovered && messages.length > 0) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsVisible(false);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, isHovered, messages.length]);

  const goToPrevious = () => {
    if (notificationIndex > 0) {
      setNotificationIndex(notificationIndex - 1);
      setProgress(0);
    }
  };

  const goToNext = () => {
    if (notificationIndex < messages.length - 1) {
      setNotificationIndex(notificationIndex + 1);
      setProgress(0);
    }
  };

  const closeSlider = () => {
    setIsVisible(false);
  };

  return {
    closeSlider,
    isVisible,
    progress,
    setIsHovered,
    goToPrevious,
    goToNext,
    notificationIndex,
  };
};

export default useSystemMessages;
