import { ChatEvents } from "@/entities/chat/events";
import useChatStore from "@/entities/chat/store";
import { ChatError } from "@/entities/chat/types";
import useMessageStore from "@/entities/message/model/store";
import { Message } from "@/entities/message/model/type";
import { chatSocket } from "@/shared/api/socket/socket";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useChatSocketEvents = () => {
  const navigate = useNavigate();
  const { setUsers, setUsersTyping } = useChatStore();
  const { addMessage } = useMessageStore();

  useEffect(() => {
    chatSocket.on(ChatEvents.ERROR, (errorMessage: ChatError) => {
      navigate("/");
      toast.error(errorMessage.data.message);
    });

    chatSocket.on(ChatEvents.NEW_MESSAGE, (message: Message) => {
      addMessage(message);
      message.users && setUsers(message.users);
    });

    chatSocket.on(
      ChatEvents.USER_IS_TYPING,
      ({ username }: { username: string }) => {
        setUsersTyping(username);
      }
    );

    return () => {
      chatSocket.off(ChatEvents.ERROR);
      chatSocket.off(ChatEvents.NEW_MESSAGE);
    };
  }, []);
};

export default useChatSocketEvents;
