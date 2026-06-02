import { Outlet } from "react-router-dom";
import { NavBar } from "../components/common/NavBar";
import { Footer } from "../components/common/Footer";

export function AppLayout() {
  return (
    <>
      <NavBar />

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
