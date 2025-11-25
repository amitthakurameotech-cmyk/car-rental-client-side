import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  Users,
  BookOpenCheck,
  CreditCard,
  Settings,
} from "lucide-react";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { to: "/admin/cars", label: "Manage Cars", icon: <Car size={18} /> },
  { to: "/admin/bookings", label: "Manage Bookings", icon: <BookOpenCheck size={18} /> },
  { to: "/admin/user", label: "Users", icon: <Users size={18} /> },
  // { to: "/admin/payments", label: "Payments", icon: <CreditCard size={18} /> },
  // { to: "/admin/settings", label: "Settings", icon: <Settings size={18} /> },
];

export default function AdminSidebar({ collapsed }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 top-0 z-40 bg-white border-r shadow-md transition-all duration-300 ease-in-out`}
      style={{ width: collapsed ? 70 : 250 }}
    >
      {/* ✅ Logo Section */}
      <div className="h-16 flex items-center justify-center border-b bg-linear-to-r from-indigo-50 to-white">
        <div className="text-2xl font-bold text-indigo-600 tracking-wide">
          {collapsed ? "A" : "Admin Panel"}
        </div>
      </div>

      {/* ✅ Navigation Links */}
      <nav className="p-3 space-y-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 group
              ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 font-semibold shadow-sm"
                  : "text-gray-700 hover:bg-indigo-50"
              }`
            }
          >
            <span
              className={`text-indigo-600 group-hover:scale-110 transition-transform`}
            >
              {l.icon}
            </span>
            {!collapsed && <span className="truncate">{l.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* ✅ Footer */}
      <div className="absolute bottom-0 left-0 w-full border-t p-3 text-xs text-center text-gray-500 bg-gray-50">
        {!collapsed && "© 2025 CarRental Admin"}
      </div>
    </aside>
  );
}
