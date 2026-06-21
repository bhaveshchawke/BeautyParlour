import { Outlet } from "react-router-dom";
import { NavBar } from "../components/common/NavBar";
import { Footer } from "../components/common/Footer";
import { MessageBox } from "../components/common/MessageBox";

export function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <MessageBox />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
