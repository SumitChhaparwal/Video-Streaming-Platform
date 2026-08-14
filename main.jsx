import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./src/view/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./src/view/components/SignupPage.jsx";
import MainBody from "./src/View/components/MainBody.jsx";
import Sidebar from "./src/View/components/Sidebar.jsx";

//To create browser routing configuration
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainBody />,
      },

      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter}></RouterProvider>
  </StrictMode>,
);
