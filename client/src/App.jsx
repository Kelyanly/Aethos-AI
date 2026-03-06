import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import Book from "./pages/Book.jsx";
import Lab from "./pages/Lab.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "book", element: <Book /> },
      { path: "lab", element: <Lab /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
