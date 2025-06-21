import { SystemMessage } from "@/entities/message/model/type";
import { useEffect, useRef, useState } from "react";

const useSystemMessages = ({ messages }: { messages: SystemMessage[] }) => {
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setNotificationIndex(messages.length - 1);
      setIsVisible(true);
    }
  }, [messages.length]);

  useEffect(() => {
    if (isVisible && messages.length > 0) {
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isVisible, messages.length]);

  const goToPrevious = () => {
    if (notificationIndex > 0) {
      setNotificationIndex(notificationIndex - 1);
    }
  };

  const goToNext = () => {
    if (notificationIndex < messages.length - 1) {
      setNotificationIndex(notificationIndex + 1);
    }
  };

  const closeSlider = () => {
    setIsVisible(false);
  };

  return {
    closeSlider,
    isVisible,
    goToPrevious,
    goToNext,
    notificationIndex,
  };
};

export default useSystemMessages;
