import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import Book from "./pages/Book.jsx";
import Lab from "./pages/Lab.jsx";
import Agents from "./pages/Agents.jsx";
import UseCases from "./pages/UseCases.jsx";
import AiRoiCalculator from "./pages/AiRoiCalculator.jsx";
import Insights from "./pages/Insights.jsx";
import Architecture from "./pages/Architecture.jsx";
import ImplementationRoadmap from "./pages/ImplementationRoadmap.jsx";
import Industries from "./pages/Industries.jsx";
import IndustryDetail from "./pages/IndustryDetail.jsx";
import RoiCases from "./pages/RoiCases.jsx";
import AiRoadmap from "./pages/AiRoadmap.jsx";
import AiUseCaseGenerator from "./pages/AiUseCaseGenerator.jsx";
import AutomationScore from "./pages/AutomationScore.jsx";
import PromptLibrary from "./pages/PromptLibrary.jsx";
import AiStack from "./pages/AiStack.jsx";
import CaseStudyGenerator from "./pages/CaseStudyGenerator.jsx";
import InsightsArticle from "./pages/InsightsArticle.jsx";
import AiOpportunityStudio from "./pages/AiOpportunityStudio.jsx";

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
      { path: "architecture", element: <Architecture /> },
      { path: "implementation-roadmap", element: <ImplementationRoadmap /> },
      { path: "industries", element: <Industries /> },
      { path: "industries/:industryId", element: <IndustryDetail /> },
      { path: "roi-cases", element: <RoiCases /> },
      { path: "ai-roadmap", element: <AiRoadmap /> },
      { path: "ai-use-case-generator", element: <AiUseCaseGenerator /> },
      { path: "automation-score", element: <AutomationScore /> },
      { path: "prompt-library", element: <PromptLibrary /> },
      { path: "ai-stack", element: <AiStack /> },
      { path: "case-study-generator", element: <CaseStudyGenerator /> },
      { path: "ai-opportunity-studio", element: <AiOpportunityStudio /> },
      { path: "insights/:slug", element: <InsightsArticle /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
