import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../home/pages/home-page/HomePage";
import SignInPage from "../auth/pages/SignInPage/SignInPage";
import SignUpPage from "../auth/pages/SignUpPage/SignUpPage";
import Dashboard from "../dashboard/pages/Dashboard";
import NewAnalysis from "../dashboard/pages/NewAnalysis";
import InterviewReport from "../dashboard/pages/InterviewReport";
import ProtectedRoute from "../shared/components/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/new-analysis",
        element: (
          <ProtectedRoute>
            <NewAnalysis />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/report/:id",
        element: (
          <ProtectedRoute>
            <InterviewReport />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
