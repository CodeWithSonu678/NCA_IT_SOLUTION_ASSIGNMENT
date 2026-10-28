import { createBrowserRouter } from "react-router";
import Registration from "./auth/pages/Registration";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Registration />,
  },
]);