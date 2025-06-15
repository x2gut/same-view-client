import { SystemMessage } from "../model/type";

export const createSystemMessage = (message: string): SystemMessage => {
  return {
    message: message,
    type: "system",
    timestamp: new Date().toISOString(),
  };
};
