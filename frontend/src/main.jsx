import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./assets/styles/index.css"

import App from "./App.jsx"
import RepoDashboard from "./components/RepoDashboard.jsx"
import RepoComponent from "./components/RepoComponent.jsx"

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
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
