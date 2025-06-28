import { ROUTES } from "../routes/consts";

const buildRoute = (id: string) => {
  return ROUTES.ROOM.replace(":id", id);
};

export default buildRoute;
