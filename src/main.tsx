import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Tilat from "./pages/Tilat";
import Varaajat from "./pages/Varaajat";
import Varaukset from "./pages/Varaukset";
import SideNav from "./components/SideNav";

const Layout = () => {
  return (
    <div className="flex h-full w-full">
      <SideNav />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/tilat",
    element: <Tilat />,
  },
  {
    path: "/varaajat",
    element: <Varaajat />,
  },
  {
    path: "/varaukset",
    element: <Varaukset />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
