import { createBrowserRouter } from "react-router-dom";
/*::: Pages :::*/
import GuestPage from "@/pages/GuestPage";
import ADM from "@/pages/ADM";

export const Router = createBrowserRouter([
  {
    path: "/retirar-senha",
    element: <GuestPage />, // Retirada de senhas
  },
  {
    path: "/admin",
    element: <ADM />, // Página DE ADM
  },
]);
