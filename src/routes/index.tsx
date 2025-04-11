import { createBrowserRouter } from "react-router-dom";
/*::: Pages :::*/
import GuestPage from "@/pages/GuestPage";
import ADM from "@/pages/ADM";

export const Router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <AuthRoute />, // Redireciona para login ou dashboard com base na autenticação
  // },
  {
    path: "/retirar-senha",
    element: <GuestPage />, // Retirada de senhas
  },
  {
    path: "/admin",
    element: <ADM />, // Página DE ADM
  },
  // {
  //   path: '/dashboard',
  //   element: <MainLayout />, // Página principal
  //   children: [
  //     {
  //       path: '/dashboard/agenda',
  //       element: <Agenda />, // Página privada de dashboard
  //     },
  //     {
  //       path: '/dashboard/settings',
  //       element: <Settings />, // Página privada de dashboard
  //     },
  //   ],
  // },
]);
