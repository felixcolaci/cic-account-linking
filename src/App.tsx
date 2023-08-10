import { Route, Routes, Outlet } from "react-router-dom";
import { Layout } from "./components/Layout";
import { StartPage } from "./routes/start";
import { ContinuePage } from "./routes/continue";
import { Error } from "./routes/error";
import { CallbackePage } from "./routes/continue/callback";
import { DismissPage } from "./routes/continue/dismiss";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Outlet></Outlet>
          </Layout>
        }
      >
        <Route path="" element={<StartPage />}></Route>
        <Route path="/continue" element={<ContinuePage />}></Route>
        <Route path="/continue/callback" element={<CallbackePage />}></Route>
        <Route path="/continue/dismiss" element={<DismissPage />}></Route>
        <Route path="/error" element={<Error />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
