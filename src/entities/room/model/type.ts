export interface Room {
  roomId: string;
  roomName: string;
  hostName: string;
  password?: string;
  roomKey?: string;
  isPrivate: boolean;
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
