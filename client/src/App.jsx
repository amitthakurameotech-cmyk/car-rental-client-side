
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/ProtectedRoute";
import { ToastProvider } from "./context/ToastContext";
import Home from "./pages/Home";

import PaymentHistory from "./pages/Paymenthistory.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";

const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminManageCars = lazy(() => import("./pages/admin/ManageCars"));
const AdminAddCar = lazy(() => import("./pages/admin/AddCar"));
const AdminManageBookings = lazy(() => import("./pages/admin/ManageBookings"));
const CarsPage = lazy(() => import("./pages/CarsPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const Signup = lazy(() => import("./pages/signup"));
const Login = lazy(() => import("./pages/login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Mybooking = lazy(() => import("./pages/Mybooking"));
const Checkout = lazy(() => import("./pages/Checkout"));
const User = lazy(() => import("./pages/admin/User"));
const Detail = lazy(() => import("./pages/Detail"));

function AppContent() {
  const location = useLocation();

  // Hide navbar on auth & payment pages
  const hideNavbar = [
    "/", 
    "/signup", 
    "/forgot-password",
    "/payment-success",
    "/history"
  ].includes(location.pathname) 
  || location.pathname.startsWith("/reset-password/");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/mybooking" element={<Mybooking />} />
          <Route path="/checkout/:bookingId" element={<Checkout />} />
          <Route path="/detail/:id" element={<Detail />} />

          {/* AUTH */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* PAYMENTS */}
          <Route path="/payment-success/*" element={<PaymentSuccess />} />
          <Route path="/history" element={<PaymentHistory />} />

          {/* PROTECTED BOOKING */}
          <Route
            path="/book"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />

          {/* EXTRA */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* ADMIN */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cars"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminManageCars />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cars/add"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminAddCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminManageBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user"
            element={
              <ProtectedRoute roles={["admin"]}>
                <User />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </BrowserRouter>
  );
}
