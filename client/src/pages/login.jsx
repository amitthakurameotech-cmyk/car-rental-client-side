import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { login, setAuthToken } from "../services/auth";
import { success, error } from "../services/toast";


function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(formData);

      const token = res.data.token || res.data?.data?.token;
      const user = res.data.user || res.data?.data?.user || res.data;

      if (token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
      }

      if (user) {
        const id = user._id || user.id || "";
        const fullName = user.fullName || user.name || "";
        const email = user.email || "";
        const role = user.role || "user";

        localStorage.setItem("id", id);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
      }

      success("Login successful!");
      navigate("/home");
    } catch (err) {
      error(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-gray-100 via-white to-gray-200">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-gray-800 text-center mb-6"
        >
          🚗 Car Rental Login
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              value={formData.email}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              value={formData.password}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your password"
            />

            {/* 🔥 FORGOT PASSWORD BUTTON ADDED HERE */}
            <motion.a
              href="/forgot-password"
              whileHover={{ scale: 1.03 }}
              className="block text-right text-blue-600 text-sm font-medium mt-2 hover:underline"
            >
              Forgot password?
            </motion.a>
          </div>

          <motion.button
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
            type="submit"
            className="w-full py-2 bg-linear-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging..." : "Login"}
          </motion.button>
        </form>

        <div className="text-center mt-4 text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
