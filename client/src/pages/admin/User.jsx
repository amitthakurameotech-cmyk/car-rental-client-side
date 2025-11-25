import React, { useEffect, useState } from "react";
import axios from "axios";

export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch all users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users"); // Change API as needed
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          👥 User Management
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading users...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-start hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-indigo-200 text-indigo-700 rounded-full flex items-center justify-center text-lg font-semibold">
                    {user.fullName?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {user.fullName || "Unknown User"}
                    </h3>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                  </div>
                </div>

                <div className="w-full">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Role:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${
                        user.role === "admin"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">Joined:</span>{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-all"
                  onClick={() => alert(`Viewing ${user.fullName}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
