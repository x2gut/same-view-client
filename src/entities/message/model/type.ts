export type Message = {
  message: string;
  type: "user" | "system";
  id?: string;
  timestamp?: string;
  username?: string;
  users?: string[];
};

export type SystemMessage = {
  type: "system";
  timestamp: string;
  message: string;
};

export type UserMessage = {
  type: "user";
  username: string;
  timestamp: string;
  message: string;
};
