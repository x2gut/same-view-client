export interface Room {
  roomId: string;
  roomName: string;
  hostName: string;
  password?: string;
  roomKey?: string;
  isPrivate: boolean;
  createdAt: Date;
  video?: {
    url?: string;
    timecode?: string;
  };
}

export interface RoomCreated {
  message: string;
  data: Room;
}

export interface RoomJoined {
  data: Room;
}

export type RoomLocalStorage = Pick<
  Room,
  "roomId" | "roomName" | "roomKey" | "isPrivate" | "createdAt"
>;
