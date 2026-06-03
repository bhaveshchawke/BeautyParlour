import { Routes, Route } from "react-router-dom";
import { DashBoard } from "./pages/DashBoard";
import { AppLayout } from "./layouts/AppLayout";
import { AboutPage } from "./pages/AboutPage";
import { ShopPage } from "./pages/ShopPage";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ApointMent } from "./pages/ApointMent";
import { Cart } from "./pages/Cart";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="about-us" element={<AboutPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="appointment" element={<ApointMent />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
