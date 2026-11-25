// src/App.jsx
import { Toaster } from "sonner";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout"; // We will use this again
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import ExerciseLibrary from "./pages/exercise-library";
import AIPlannerPage from "./pages/AIPlanner";
import { pagesRoutes } from "./lib/routes/page-routes";
import Movements from "./pages/movements";
import SingleMovement from "./pages/single-movement";
import ScrollToTop from "./lib/utils/scrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      {/* AuthProvider wraps EVERYTHING */}
      <AuthProvider>
        <Toaster position="top-left" duration={3000} />
        <Routes>
          {/* --- PROTECTED ROUTES --- */}
          {/* All routes inside here are protected and use the MainLayout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path={pagesRoutes.exerciseLibrary} element={<ExerciseLibrary />} />
            <Route path={pagesRoutes.movements} element={<Movements />} />
            <Route path={pagesRoutes.singleMovement} element={<SingleMovement />} />
            <Route path={pagesRoutes.aiPlanner} element={<AIPlannerPage />} />
          </Route>

          {/* --- PUBLIC ROUTES --- */}
          {/* These routes use the AuthLayout. We will assume for now that if a user is logged in,
              they won't see these pages anyway due to navigation. A more complex PublicRoute
              wrapper is not needed and was causing the issues. */}
          <Route element={<AuthLayout />}>
            <Route path={pagesRoutes.login} element={<Login />} />
            <Route path={pagesRoutes.register} element={<Registration />} />
          </Route>
          
          {/* --- CATCH-ALL --- */}
          {/* Redirects any unknown URL to the home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;