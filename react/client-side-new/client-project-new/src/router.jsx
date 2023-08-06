import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import ErrorPage from './pages/ErrorPage.jsx';
import DetailPage from './pages/DetailPage.jsx';
import LandingPage from './pages/LandingPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "detail/:id",
        element: <DetailPage />,
      },
    ],
  },
]);

export default router