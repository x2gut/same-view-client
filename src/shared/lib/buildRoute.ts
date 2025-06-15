import { ROUTES } from "../routes/consts";

export const buildRoute = (id: string) => {
  return ROUTES.ROOM.replace(":id", id);
};
