import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // ✅ Load user data directly from localStorage
  useEffect(() => {
    try {
      const id = localStorage.getItem("id");
      const fullName = localStorage.getItem("fullName");
      const email = localStorage.getItem("email");
      const role = localStorage.getItem("role");
      const token = localStorage.getItem("token");

      if (token && id) {
        setUserData({ id, fullName, email, role });
      } else {
        setUserData(null);
      }
    } catch {
      setUserData(null);
    }
  }, []);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md font-medium transition-colors ${
      isActive
        ? "bg-gray-300 text-black"
        : "text-black hover:bg-gray-200 hover:text-gray-800"
    }`;

  // ✅ Logout clears everything
  const handleLogout = () => {
    localStorage.clear();
    setUserData(null);
    navigate("/");
  };

  return (
    <header className="bg-white text-black shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-3">
        {/* ✅ Logo */}
        <div className="flex items-center gap-3">
          <div
            className="text-2xl font-bold tracking-wide cursor-pointer text-black"
            onClick={() => navigate("/home")}
          >
            AutoRentX
          </div>

          {/* ✅ Main Navigation Links */}
          <nav className="hidden md:flex gap-2">
            <NavLink to="/home" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/cars" className={linkClass}>
              Cars
            </NavLink>
            <NavLink to="/mybooking" className={linkClass}>
              My Bookings
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
            {userData?.role === "admin" && (
              <>
                <NavLink to="/admin/dashboard" className={linkClass}>
                  Admin
                </NavLink>
                <NavLink to="/admin/cars" className={linkClass}>
                  Manage Cars
                </NavLink>
                <NavLink to="/admin/bookings" className={linkClass}>
                  Manage Bookings
                </NavLink>
                <NavLink to="/admin/user" className={linkClass}>
                  Users
                </NavLink>
              </>
            )}
          </nav>
        </div>

        {/* ✅ User Info (Desktop) */}
        {userData ? (
          <div className="hidden md:flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
            <div className="text-sm text-black">
              <p className="font-semibold">{userData.fullName || "User"}</p>
              <p className="text-gray-600 text-xs">{userData.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="hidden md:block px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
          >
            Login
          </button>
        )}

        {/* ✅ Hamburger menu for mobile */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-200"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* ✅ Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white p-3 border-t border-gray-300">
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/home"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/cars"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              Cars
            </NavLink>
            <NavLink
              to="/mybooking"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              My Bookings
            </NavLink>
            <NavLink
              to="/about"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              Contact
            </NavLink>

            {userData?.role === "admin" && (
              <>
                <NavLink
                  to="/admin/dashboard"
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  Admin
                </NavLink>
                <NavLink
                  to="/admin/cars"
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  Manage Cars
                </NavLink>
                <NavLink
                  to="/admin/bookings"
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  Manage Bookings
                </NavLink>
                <NavLink
                  to="/admin/user"
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  Users
                </NavLink>
              </>
            )}

            {userData ? (
              <div className="flex flex-col gap-1 bg-gray-100 p-2 rounded-md mt-2 text-black">
                <p className="text-sm font-semibold">{userData.fullName}</p>
                <p className="text-xs text-gray-700">{userData.email}</p>
                <button
                  onClick={handleLogout}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white rounded-md py-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/")}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md py-1"
              >
                Login
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
