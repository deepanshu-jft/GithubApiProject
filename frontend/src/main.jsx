import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./assets/styles/index.css"

import App from "./App.jsx"
import RepoDashboard from "./components/RepoDashboard.jsx"
import RepoComponent from "./components/RepoComponent.jsx"
import CommitComponent from "./components/CommitComponent.jsx"
import FilenameComponent from "./components/FilenameComponent.jsx"

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
            path: "/:userName/dashboard/:repoName/",
            element: <CommitComponent />,
          },
        ],
      },
    ],
  },
  {
    path: "/difference",
    element: <FilenameComponent />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
