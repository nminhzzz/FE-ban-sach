import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout.tsx";
import HomePage from "./pages/home.tsx";
import BookPage from "./pages/book.tsx";
import RegisterPage from "./pages/client/auth/register.tsx";
import LoginPage from "./pages/client/auth/login.tsx";
import "./index.css";
import { AppProvider } from "components/context/app.context.tsx";
import ProtectedRoute from "./components/protectedpage/index.tsx";
import LayoutAdmin from "./components/layout/layout.admin.tsx";
import DashBroad from "./pages/admin/dashbroad.tsx";
import UserAdmin from "./pages/admin/user.tsx";
import BookAdmin from "./pages/admin/book.tsx";
import OrderAdmin from "./pages/admin/order.tsx";
import OrderPage from "./pages/client/order.tsx";
import History from "./pages/history.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/book/:id",
        element: <BookPage />,
      },
      {
        path: "book",
        element: <BookPage />,
      },
      {
        path: "product",
        element: <div>Hello world!</div>,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <div>Checkout</div>
          </ProtectedRoute>
        ),
      },
      {
        path: "/order",
        element: (
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/history",
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <DashBroad />,
      },
      {
        path: "user",
        element: <UserAdmin />,
      },
      {
        path: "book",
        element: <BookAdmin />,
      },
      {
        path: "order",
        element: <OrderAdmin />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);
