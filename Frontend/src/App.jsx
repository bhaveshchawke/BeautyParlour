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
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { AppointmentDetail } from "./pages/AppointmentDetail";
import { AdminDashboard } from "./AdminStore/AdminDashboard";
import { ProtectedForAdmin } from "./components/common/ProtectedForAdmin";
import { NotFound } from "./pages/NotFound";
import { ServiceManagement } from "./AdminStore/ServiceManagement";
import { AllServices } from "./pages/AllServices";
import { HistoryPage } from "./AdminStore/HistoryPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="about-us" element={<AboutPage />} />
          <Route
            path="admindashboard"
            element={
              <ProtectedForAdmin>
                <AdminDashboard />
              </ProtectedForAdmin>
            }
          />
          <Route
            path="Servicemanagement"
            element={
              <ProtectedForAdmin>
                <ServiceManagement />
              </ProtectedForAdmin>
            }
          />
          <Route
            path="userhistory"
            element={
              <ProtectedForAdmin>
                <HistoryPage />
              </ProtectedForAdmin>
            }
          />
          <Route path="shop" element={<ShopPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="appointment" element={<ApointMent />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="services" element={<AllServices />} />
          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/appointmentdetail/:id"
            element={
              <ProtectedRoute>
                <AppointmentDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
