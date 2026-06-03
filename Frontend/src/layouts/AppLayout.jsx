import { Outlet } from "react-router-dom";
import { NavBar } from "../components/common/NavBar";
import { Footer } from "../components/common/Footer";
import { MessageBox } from "../components/common/MessageBox";

export function AppLayout() {
  return (
    <>
      <NavBar />
      <MessageBox />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
