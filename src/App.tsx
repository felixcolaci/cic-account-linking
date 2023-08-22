import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { StartPage } from "./routes/start";
import { ContinuePage } from "./routes/continue";
import { Error } from "./routes/error";
import { CallbackePage } from "./routes/continue/callback";
import { DismissPage } from "./routes/continue/dismiss";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Outlet></Outlet>
        </Layout>
      ),
      children: [
        {
          path: "",
          element: <StartPage />,
        },
        {
          path: "/continue",
          element: <ContinuePage />,
        },
        {
          path: "/continue/callback",
          element: <CallbackePage />,
        },
        {
          path: "/continue/dismiss",
          element: <DismissPage />,
        },
        {
          path: "/error",
          element: <Error />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
