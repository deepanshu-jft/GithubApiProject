import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./assets/styles/index.css"

import App from "./App.jsx"
import RepoDashboard from "./components/RepoDashboard.jsx"
import RepoComponent from "./components/RepoComponent.jsx"
import FilenameDashboard from "./components/FilenameDashboard"
// import FilenameComponent from "./components/FilenameComponent.jsx"
import CommitDifference from "./components/CommitDifference.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/:userName/dashboard/",
    element: <RepoDashboard />,
    children: [
      {
        path: "/:userName/dashboard/:repoName",
        element: <RepoComponent />,
        children: [
          {
            path: "/:userName/dashboard/:repoName/:commitSha",
            element: <FilenameDashboard />,
            children: [
              {
                path: "/:userName/dashboard/:repoName/:commitSha/:fileName",
                element: <CommitDifference />,
              },
            ],
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
