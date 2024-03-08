import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./assets/styles/App.css"
import LoginPage from "./components/LoginPage"
import CommitDifference from "./components/CommitDifference"
import FilenameDashboard from "./components/FilenameDashboard"
import RepoComponent from "./components/RepoComponent"
import RepoDashboard from "./components/RepoDashboard"
import { UserProvider } from "./components/CodeContext"

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
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

  return (
    <div className="App">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  )
}

export default App
