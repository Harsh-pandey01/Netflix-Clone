import { createRoot } from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import { MoviesDataContextProvider } from "./context/ApiRequest";
import { AuthContextProvider } from "./context/FirebaseContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MovieDetailPage from "./pages/MovieDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route
          path="movieDetail"
          element={
            <ProtectedRoute>
              <MovieDetailPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

createRoot(document.querySelector("#root")).render(
  <AuthContextProvider>
    <MoviesDataContextProvider>
      <RouterProvider router={router} />
    </MoviesDataContextProvider>
  </AuthContextProvider>
);
