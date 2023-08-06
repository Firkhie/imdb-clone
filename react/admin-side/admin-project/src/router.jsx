import { createBrowserRouter, redirect } from "react-router-dom";
import App from './App.jsx'
import ErrorPage from './pages/ErrorPage.jsx';
import DashboardPage from "./pages/DashboardPage.jsx";
import GenresPage from "./pages/GenresPage.jsx";
import NewMoviePage from "./pages/NewMoviePage.jsx";
import NewGenrePage from "./pages/NewGenrePage.jsx";
import CastsPage from "./pages/CastsPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NewCastPage from "./pages/NewCastPage.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    loader: () => {
      let token = localStorage.getItem('access_token')
      if (!token) {
        return redirect('/login')
      }
      return null
    },
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "movies/new",
        element: <NewMoviePage />,
      },
      {
        path: "movies/:id",
        element: <NewMoviePage />,
      },
      {
        path: "genres",
        element: <GenresPage />,
      },
      {
        path: "genres/new",
        element: <NewGenrePage />,
      },
      {
        path: "genres/:id",
        element: <NewGenrePage />,
      },
      {
        path: "casts",
        element: <CastsPage />,
      },
      {
        path: "casts/:id",
        element: <NewCastPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "login",
    loader: () => {
      let token = localStorage.getItem('access_token')
      if (token) {
        return redirect('/')
      }
      return null
    },
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  }
]);

export default router