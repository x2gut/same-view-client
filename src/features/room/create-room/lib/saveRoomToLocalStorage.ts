import { RoomLocalStorage } from "@/entities/room/model/type";

const saveRoomToLocalStorage = (room: RoomLocalStorage) => {
  const rooms: Array<RoomLocalStorage> =
    JSON.parse(localStorage.getItem("rooms")) || [];

  if (rooms.length >= 3) {
    rooms.shift();
  }

  rooms.push(room);
  localStorage.setItem("rooms", JSON.stringify(rooms));
};

export default saveRoomToLocalStorage;
