import { createBrowserRouter, Navigate } from "react-router-dom";
/*::: Pages :::*/
import GuestPage from "@/pages/GuestPage";
import ADM from "@/pages/ADM";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/retirar-senha" replace />,
  },
  {
    path: "/retirar-senha",
    element: <GuestPage />, // Retirada de senhas
  },
  {
    path: "/admin",
    element: <ADM />, // Página DE ADM
  },
]);
