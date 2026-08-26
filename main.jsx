import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./src/view/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./src/view/components/SignupPage.jsx";
import MainBody from "./src/view/components/MainBody.jsx";
import VideoPlayer from "./src/view/components/VideoPlayer.jsx";
import CreateChannel from "./src/view/components/CreateChannel.jsx";
import Channel from "./src/view/components/Channel.jsx";
import Sidebar from "./src/view/components/Sidebar.jsx";
import ErrorComp from "./src/view/components/ErrorComp.jsx";
//To create browser routing configuration
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComp />,
    children: [
      {
        path: "/",
        element: <MainBody />,
      },

      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/videoplayer/:id",
        element: <>
        <Sidebar/>
        <VideoPlayer />
        </>,
      },
      {
        path: "/createchannel",
        element: <CreateChannel />,
      },
      {
        path: "/channel",
        element: <>
        <Sidebar/>
        <Channel />
        </>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter}></RouterProvider>
  </StrictMode>,
);
