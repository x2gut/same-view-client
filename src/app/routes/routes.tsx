import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../../shared/routes/consts";
import { MainPage } from "../../pages/main";
import { RoomPage } from "@/pages/room";

const routes = createBrowserRouter(
  [
    {
      element: <MainPage />,
      path: ROUTES.HOME,
    },
    {
      element: <RoomPage />,
      path: ROUTES.ROOM,
    },
  ],
);

export default routes;
