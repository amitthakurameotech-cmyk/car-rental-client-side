import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBookingDataByUserId } from "../services/booking"; // ✅ use your correct function name
import { absUrl } from "../services/api";
import { Calendar, MapPin, Car, IndianRupee } from "lucide-react";
// import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get current logged-in user id from localStorage
  // Note: `login.jsx` stores `id` as a plain string (not JSON), so don't JSON.parse here.
  const storedUserId = localStorage.getItem("id");
  const currentUserId = storedUserId && storedUserId !== "undefined" ? storedUserId : null;

  useEffect(() => {
    async function fetchMyBookings() {
      if (!currentUserId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const userId = currentUserId;
        const res = await getBookingDataByUserId(userId);
        console.log("Bookings Response:", res);

        // ✅ Handle backend response structure
        const data =
          res?.data?.data?.length > 0
            ? res.data.data
            : Array.isArray(res?.data)
            ? res.data
            : [];

        // Filter bookings to current user client-side as a fallback in case
        // the backend doesn't correctly honor the userId query param.
        const filtered = data.filter((b) => {
          const bookingUser = b.user || b.userId || b.user_id || null;
          let bid = null;
          if (!bookingUser) return false;
          if (typeof bookingUser === 'string') bid = bookingUser;
          else if (typeof bookingUser === 'object') bid = bookingUser._id || bookingUser.id;
          else bid = bookingUser;

          return String(bid) === String(userId);
        });

        setBookings(filtered);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMyBookings();
  }, []);

  if (!currentUserId)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Please login to view your bookings.
      </div>
    );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-indigo-600 text-xl font-semibold">
        Loading your bookings...
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-5xl mt-10 font-bold text-center mb-10 text-indigo-700 tracking-tight">
          My Bookings
        </h3>

        {bookings.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-3xl shadow-lg border border-indigo-100">
            <p className="text-gray-500 text-lg mb-4">
              You haven’t booked any cars yet.
            </p>
            <div className="flex items-center justify-center">
              <button
                onClick={() => navigate('/cars')}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
              >
                Browse Cars
              </button>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((b, index) => (
              <div
                key={b._id || index}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100"
              >
                {/* Car Image */}
                <div className="relative">
                    {b.car?.image ? (
                    <img
                      src={absUrl(b.car.image)}
                      alt={b.car?.name || "Car"}
                      onError={(e) => {
                        console.warn(`Image failed to load: ${b.car?.image}`);
                        e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                      }}
                      className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-52 w-full bg-gray-100 flex items-center justify-center border border-gray-200">
                      <Car className="h-14 w-14 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/80 text-indigo-600 font-semibold text-sm px-3 py-1 rounded-full shadow">
                    {b.car?.brand || "Brand"}
                  </div>
                </div>

                {/* Booking Details */}
                <div className="p-5">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Car className="w-5 h-5 text-indigo-600" />
                    {b.car?.name || "Car"}
                  </h2>

                  <div className="text-gray-600 text-sm space-y-2 mb-3">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-500" />
                      <strong>Pickup:</strong> {b.pickupLocation || "-"}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-pink-500" />
                      <strong>Drop:</strong> {b.dropLocation || "-"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <strong>From:</strong>{" "}
                      {b.startDate
                        ? new Date(b.startDate).toLocaleDateString()
                        : "-"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-red-500" />
                      <strong>To:</strong>{" "}
                      {b.endDate
                        ? new Date(b.endDate).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-indigo-700 font-bold text-lg">
                      <IndianRupee className="w-4 h-4" />
                      {b.totalPrice || 0}
                    </span>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          b.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : b.paymentStatus === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {b.paymentStatus || "Pending"}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          b.bookingStatus === "Completed"
                            ? "bg-green-50 text-green-700"
                            : b.bookingStatus === "Cancelled"
                            ? "bg-red-50 text-red-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {b.bookingStatus || "Upcoming"}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 border-t pt-0 flex justify-end">
                    {String(b.paymentStatus).toLowerCase() !== 'paid' && b.bookingStatus !== 'Cancelled' && (
                      <button
                        onClick={() => navigate(`/checkout/${b._id || b.id}`, { state: { booking: b } })}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                      >
                        Checkout
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
