import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../../shared/routes/consts";
import {
  AboutPage,
  MainPage,
  NotFoundPage,
  RoomPage,
  TermsPage,
} from "@/pages";

const routes = createBrowserRouter([
  {
    element: <MainPage />,
    path: ROUTES.HOME,
  },
  {
    element: <RoomPage />,
    path: ROUTES.ROOM,
  },
  {
    element: <NotFoundPage />,
    path: "*",
  },
  {
    element: <AboutPage />,
    path: ROUTES.ABOUT,
  },
  {
    element: <TermsPage />,
    path: ROUTES.TERMS,
  },
]);

export default routes;
