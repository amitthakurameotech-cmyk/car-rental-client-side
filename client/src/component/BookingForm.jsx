import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking } from "../services/booking";

export default function BookingForm({ prefillCar = null }) {
  const location = useLocation();
  const navigate = useNavigate();
  const passed = prefillCar || location.state?.car || null;

  // Read logged-in user id from localStorage (login stores `id` and `token` as separate keys)
  const storedUserId = localStorage.getItem("id");
  const currentUserId = storedUserId && storedUserId !== "undefined" ? storedUserId : null;

  const pricePerDay = passed?.pricePerDay || passed?.price || 0;

  const [formData, setFormData] = useState({
  user: currentUserId || "",
    car: passed?._id || passed?.id || "",
    pickupLocation: "",
    dropLocation: "",
    startDate: "",
    endDate: "",
    totalPrice: 0,
    paymentStatus: "Pending",
     bookingStatus: "Pending",
  });

  useEffect(() => {
    // if car passed later, update
    if (passed) {
      setFormData((prev) => ({
        ...prev,
        car: passed._id || passed.id,
        totalPrice: pricePerDay,
      }));
    }
  }, [passed]);

  // compute date mins to prevent past dates
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  // Handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Auto calculate total price and enforce date logic
    if (name === "startDate" || name === "endDate") {
      // determine current start/end after this change
      let start = name === "startDate" ? value : formData.startDate;
      let end = name === "endDate" ? value : formData.endDate;

      // if start changed and end exists but is before start, bump end to start
      if (name === "startDate" && end && new Date(end) < new Date(start)) {
        end = start;
        setFormData((prev) => ({ ...prev, endDate: end }));
      }

      if (start && end) {
        const diffDays = Math.max(
          1,
          Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24))
        );
        const total = diffDays * Number(pricePerDay || formData.totalPrice || 0);
        setFormData((prev) => ({ ...prev, totalPrice: total }));
      }
    }
  }

  // Handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    // lazily import toast helpers so top-level modules don't create cycles
    const { success, error } = await import("../services/toast");

    if (!formData.user) {
      error("⚠️ Please login to continue booking.");
      return;
    }

    try {
      const payload = {
        ...formData,
        totalPrice: Number(formData.totalPrice),
      };
      console.log(payload);
      await createBooking(payload);
      success("✅ Booking created successfully!");
      navigate("/mybooking");
    } catch (err) {
      console.error(err);
      error(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong while booking."
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-white px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
           Car Booking Form
        </h2>

        {passed && (
          <div className="mb-5 p-3 bg-indigo-50 rounded-md border border-indigo-100">
            <p className="text-sm text-gray-600">
              <strong>Car Selected:</strong>{" "}
              <span className="font-medium">{passed.name}</span>
            </p>
            <p className="text-sm text-gray-600">
              <strong>Price/Day:</strong> ₹{pricePerDay}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pickup Location
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                required
                placeholder="Enter pickup location"
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Drop Location
              </label>
              <input
                type="text"
                name="dropLocation"
                value={formData.dropLocation}
                onChange={handleChange}
                required
                placeholder="Enter drop location"
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                min={todayStr}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                min={formData.startDate || todayStr}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Price
            </label>
            <input
              type="text"
              name="totalPrice"
              value={formData.totalPrice}
              readOnly
              className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Status
              </label>
              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700">
                Booking Status
              </label>
              <select
                name="bookingStatus"
                value={formData.bookingStatus}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Pending">Pending</option>
              
                <option value="Confirm">Confirm</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div> */}
          </div>

          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold rounded-lg px-6 py-2 hover:bg-indigo-700 shadow-md transition"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
