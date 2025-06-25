import { createBrowserRouter } from "react-router-dom";
import { MainPage, Page404, RoomPage } from "@/pages";
import { ROUTES } from "../../shared/routes/consts";
import AboutPage from "@/pages/about/ui/aboutPage";

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
    element: <Page404 />,
    path: "*",
  },
  {
    element: <AboutPage />,
    path: ROUTES.ABOUT,
  },
]);

export default routes;
