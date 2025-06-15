import useTheme from "@/features/switch-theme/model/useTheme";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  const { initTheme } = useTheme();

  useEffect(() => {
    initTheme();
  }, []);

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
