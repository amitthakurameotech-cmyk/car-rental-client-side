import React, { useEffect, useState } from "react";
import { getCars } from "../../services/car";
import { getBookings } from "../../services/booking";
import AdminLayout from "../../component/AdminLayout";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ cars: 0, bookings: 0, revenue: 0 });
  const [recent, setRecent] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [bookingTrends, setBookingTrends] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const carsRes = await getCars();
        const bookingsRes = await getBookings();

        const cars = carsRes?.data || [];
        const bookings = bookingsRes?.data || [];

        const revenue = Array.isArray(bookings)
          ? bookings.reduce((s, b) => s + (b.totalPrice || 0), 0)
          : 0;

        // Group by month
        const monthly = {};
        bookings.forEach((b) => {
          const month = new Date(b.startDate).toLocaleString("default", {
            month: "short",
          });
          monthly[month] = (monthly[month] || 0) + (b.totalPrice || 0);
        });

        const monthlyData = Object.entries(monthly).map(([month, total]) => ({
          month,
          revenue: total,
        }));

        // Booking trends by date
        const trend = {};
        bookings.forEach((b) => {
          const date = new Date(b.startDate).toLocaleDateString();
          trend[date] = (trend[date] || 0) + 1;
        });

        const trendData = Object.entries(trend).map(([date, count]) => ({
          date,
          count,
        }));

        setStats({
          cars: cars.length,
          bookings: bookings.length,
          revenue,
        });
        setMonthlyRevenue(monthlyData);
        setBookingTrends(trendData);
        setRecent(bookings.slice(0, 8));
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  return (
    <AdminLayout>
      <div className="pt-6 px-4 text-gray-800 bg-gray-50 min-h-screen transition-colors duration-300">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow hover:shadow-md transition">
            <div className="text-sm text-gray-500">Total Cars</div>
            <div className="text-3xl font-semibold mt-2 text-gray-800">{stats.cars}</div>
          </div>

          <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow hover:shadow-md transition">
            <div className="text-sm text-gray-500">Total Bookings</div>
            <div className="text-3xl font-semibold mt-2 text-gray-800">{stats.bookings}</div>
          </div>

          <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow hover:shadow-md transition">
            <div className="text-sm text-gray-500">Total Revenue</div>
            <div className="text-3xl font-semibold mt-2 text-green-600">
              ${stats.revenue}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow hover:shadow-md transition">
            <h2 className="font-semibold mb-4 text-gray-800">Monthly Revenue</h2>
            {monthlyRevenue.length === 0 ? (
              <div className="text-gray-500 text-sm">No data yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow hover:shadow-md transition">
            <h2 className="font-semibold mb-4 text-gray-800">Booking Trends</h2>
            {bookingTrends.length === 0 ? (
              <div className="text-gray-500 text-sm">No booking data</div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={bookingTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#2563EB" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow p-4">
          <h2 className="font-semibold mb-4 text-gray-800">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b bg-gray-100 text-gray-700">
                  <th className="p-3">Customer</th>
                  <th className="p-3">Car</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Price</th>
                </tr>
              </thead>
              <tbody>
                {recent.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-gray-500 text-center p-3">
                      No recent bookings
                    </td>
                  </tr>
                ) : (
                  recent.map((b) => (
                    <tr
                      key={b._id || b.id}
                      className="border-b hover:bg-blue-50 transition cursor-pointer"
                    >
                      <td className="p-3">{b.userName || b.user?.name || "User"}</td>
                      <td className="p-3">{b.carName || b.car?.name || "Car"}</td>
                      <td className="p-3">
                        {new Date(b.startDate).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-green-600 font-medium">
                        ${b.totalPrice || 0}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
