import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BookingForm from "../component/BookingForm";

export default function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  // allow passing car via navigation state
  const car = location.state?.car || null;

  return (
    <div className="min-h-screen flex items-start justify-center py-20 px-4">
      <BookingForm prefillCar={car} />
    </div>
  );
}
