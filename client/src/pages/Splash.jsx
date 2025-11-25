import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const timer = setTimeout(() => {
      if (token) navigate("/cars");
      else navigate("/login");
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center text-white">
        <div className="text-5xl font-bold mb-4">CarRental</div>
        <div className="text-lg opacity-90">Fast. Reliable. Simple.</div>
      </div>
    </div>
  );
}
