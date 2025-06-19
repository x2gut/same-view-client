import { createBrowserRouter } from "react-router-dom";
import { MainPage, Page404, RoomPage } from "@/pages";
import { ROUTES } from "../../shared/routes/consts";

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
    {
      element: <Page404 />,
      path: "*",
    }
  ],
);

export default routes;
