import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, ArrowLeft, Check } from "lucide-react";
import { forgetPassword } from "../services/auth";
import { success, error } from "../services/toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      error("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      const res = await forgetPassword({ email });
      
      console.log('forgetPassword response:', res);
      success("✅ Reset link sent! Check your email.");
      setSubmitted(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error('forgetPassword error:', err);
      error(err.response?.data?.message || err.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center border border-indigo-100">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Email Sent!</h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>. Please check your email and click the link to reset your password.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Redirecting to login in 3 seconds...
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6 font-medium transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Login
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-indigo-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-100 rounded-full p-3">
                <Mail className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Forgot Password?</h1>
            <p className="text-gray-600 mt-2">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 text-gray-600">
            Remember your password?{" "}
            <Link to="/" className="text-indigo-600 font-semibold hover:text-indigo-800 transition">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
