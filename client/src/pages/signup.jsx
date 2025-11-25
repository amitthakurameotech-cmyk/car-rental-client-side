import React, { useState } from "react";
import { motion } from "framer-motion";
import { register } from "../services/auth";
import { success, error } from "../services/toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------- PASSWORD CHECKLIST RULES ----------
  const rules = {
    length: formData.password.length >= 8,
    number: /[0-9]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    uppercase: /[A-Z]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  };

  const allValid = Object.values(rules).every((v) => v === true);

  // -------- PASSWORD STRENGTH ----------
  const getStrength = () => {
    let score = 0;
    if (rules.length) score++;
    if (rules.lowercase) score++;
    if (rules.uppercase) score++;
    if (rules.number) score++;
    if (rules.special) score++;

    if (score <= 2) return "Weak";
    if (score === 3 || score === 4) return "Medium";
    return "Strong";
  };

  const strength = getStrength();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!allValid) {
      error("Please meet all password requirements.");
      return;
    }

    setLoading(true);
    (async () => {
      try {
        await register(formData);
        success("Registration successful. Please login.");
        navigate("/");
      } catch (err) {
        error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-gray-100 via-white to-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          🏁 Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              onChange={handleChange}
              value={formData.fullName}
              className="w-full px-4 py-2 rounded-lg border bg-gray-50"
            />
          </div>

          {/* Email */}
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
              className="w-full px-4 py-2 rounded-lg border bg-gray-50"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                onChange={handleChange}
                value={formData.password}
                onFocus={() => setPasswordFocused(true)} // 👈 show features when clicked
                onBlur={() =>
                  formData.password === "" && setPasswordFocused(false)
                }
                className="w-full px-4 py-2 rounded-lg border bg-gray-50 pr-10"
              />

              <div
                className="absolute right-3 top-2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </div>
            </div>

            {/* Show password features ONLY when input is focused */}
            {passwordFocused && (
              <div className="mt-2">
                {/* Strength Bar */}
                {formData.password !== "" && (
                  <>
                    <p
                      className={`font-semibold text-sm ${
                        strength === "Weak"
                          ? "text-red-500"
                          : strength === "Medium"
                          ? "text-yellow-500"
                          : "text-green-600"
                      }`}
                    >
                      Strength: {strength}
                    </p>

                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className={`
                h-full rounded-full transition-all duration-300
                ${
                  strength === "Weak"
                    ? "bg-red-500 w-1/4"
                    : strength === "Medium"
                    ? "bg-yellow-500 w-2/3"
                    : "bg-green-600 w-full"
                }
              `}
                      ></div>
                    </div>
                  </>
                )}

                {/* Password Checklist */}
                <div className="mt-4 space-y-1 text-sm">
                  <ChecklistItem
                    label="At least 8 characters"
                    valid={rules.length}
                  />
                  <ChecklistItem
                    label="Contains a number (0-9)"
                    valid={rules.number}
                  />
                  <ChecklistItem
                    label="Contains lowercase (a-z)"
                    valid={rules.lowercase}
                  />
                  <ChecklistItem
                    label="Contains uppercase (A-Z)"
                    valid={rules.uppercase}
                  />
                  <ChecklistItem
                    label="Contains special character (!@#$*)"
                    valid={rules.special}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              required
              onChange={handleChange}
              value={formData.phoneNumber}
              className="w-full px-4 py-2 rounded-lg border bg-gray-50"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={!loading && allValid ? { scale: 1.05 } : {}}
            whileTap={!loading && allValid ? { scale: 0.97 } : {}}
            type="submit"
            disabled={!allValid || loading}
            className={`w-full py-2 text-white font-semibold rounded-lg shadow-md transition-all ${
              allValid && !loading
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>
        </form>

        <div className="text-center mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 font-medium underline">
            Login
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// Checklist Item Component
function ChecklistItem({ label, valid }) {
  return (
    <p
      className={`flex items-center gap-2 ${
        valid ? "text-green-600" : "text-gray-600"
      }`}
    >
      <span
        className={`w-5 h-5 flex items-center justify-center rounded-full text-white text-xs ${
          valid ? "bg-green-600" : "bg-gray-400"
        }`}
      >
        {valid ? "✔" : "✗"}
      </span>
      {label}
    </p>
  );
}

export default Signup;
