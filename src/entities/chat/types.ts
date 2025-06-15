export enum ChatErrorType {
  USER_ALREADY_CONNECTED = "UserAlreadyConnected",
}

export type ChatError = {
  data: {
    errorType: `${ChatErrorType}`;
    message: string;
  };
};
