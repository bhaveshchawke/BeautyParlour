import { Routes, Route } from "react-router-dom";
import { DashBoard } from "./pages/DashBoard";
import { AppLayout } from "./layouts/AppLayout";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index path="/" element={<DashBoard />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
