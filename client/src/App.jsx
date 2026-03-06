import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import Book from "./pages/Book.jsx";
import Lab from "./pages/Lab.jsx";
import Agents from "./pages/Agents.jsx";
import UseCases from "./pages/UseCases.jsx";
import AiRoiCalculator from "./pages/AiRoiCalculator.jsx";
import Insights from "./pages/Insights.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "book", element: <Book /> },
      { path: "agents", element: <Agents /> },
      { path: "use-cases", element: <UseCases /> },
      { path: "lab", element: <Lab /> },
      { path: "ai-roi-calculator", element: <AiRoiCalculator /> },
      { path: "insights", element: <Insights /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
