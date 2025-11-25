import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";

export default function AdminTopbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      // login.jsx stores these items individually (not a `user` object)
      const id = localStorage.getItem("id");
      const fullName = localStorage.getItem("fullName");
      const email = localStorage.getItem("email");
      const role = localStorage.getItem("role");
      const token = localStorage.getItem("token");

      if (id && token) {
        setUser({ id, fullName, email, role });
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    }
  }, []);

  function logout() {
    // Clear the same keys that login sets
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/");
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b shadow-sm h-16 flex items-center justify-between px-4">
      {/* ✅ Left Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition"
          title="Toggle sidebar"
        >
          <Menu className="text-gray-700" size={22} />
        </button>
        <div className="text-xl font-semibold text-indigo-600 tracking-wide">
          Admin Panel
        </div>
      </div>

      {/* ✅ Right Section */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="flex items-center gap-3 bg-gray-50 border rounded-lg px-3 py-1.5 shadow-sm">
          <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
            {(user?.fullName || "A").charAt(0).toUpperCase()}
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-800">
              {user?.fullName || "Admin"}
            </div>
            <div className="text-xs text-gray-500">{user?.email || ""}</div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={16} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}
