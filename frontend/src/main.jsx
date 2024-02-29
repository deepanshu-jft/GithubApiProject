import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./assets/styles/index.css"

import App from "./App.jsx"
import RepoDashboard from "./components/RepoDashboard.jsx"
import RepoComponent from "./components/RepoComponent.jsx"
import CommitComponent from "./components/CommitComponent.jsx"
import CommitDifference from "./components/CommitDifference.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/dashboard",
    element: <RepoDashboard />,
    children: [
      {
        path: "/dashboard/:repoId",
        element: <RepoComponent />,
        children: [
          {
            path: "/dashboard/:repoId/:commitId",
            element: <CommitComponent />,
          },
        ],
      },
    ],
  },
  {
    path: "/difference",
    element: <CommitDifference />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
