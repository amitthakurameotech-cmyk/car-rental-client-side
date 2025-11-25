import React, { useEffect, useState } from "react";
import { getCars, createCar, updateCar, deleteCar } from "../../services/car";
import CarForm from "../../component/CarForm";
import AdminLayout from "../../component/AdminLayout";

export default function ManageCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await getCars();
      const data = res?.data || [];
      setCars(Array.isArray(data) ? data : data.data || data.cars || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data) {
    try {
      const res = await createCar(data);
      const newCar = res?.data || res?.data?.data || null;
      if (newCar) setCars((s) => [newCar, ...s]);
      setShowForm(false);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this car?")) return;
    try {
      await deleteCar(id);
      setCars((s) => s.filter((c) => (c._id || c.id) !== id));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <AdminLayout>
      <div className="px-4 py-6 bg-gray-50 min-h-screen text-gray-800 transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            🚗 Manage Cars
          </h1>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            + Add Car
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-4 overflow-x-auto hover:shadow-md transition">
          {loading ? (
            <div className="text-center py-6 text-gray-500">Loading cars...</div>
          ) : cars.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No cars found. Add some!
            </div>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Brand</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Price/Day</th>
                  <th className="p-3 text-left">Available</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((c, i) => (
                  <tr
                    key={c._id || c.id || i}
                    className="border-t hover:bg-blue-50 transition cursor-pointer"
                  >
                    <td className="p-3 font-medium text-gray-800">{c.name}</td>
                    <td className="p-3">{c.brand}</td>
                    <td className="p-3">{c.type}</td>
                    <td className="p-3 text-green-700 font-medium">
                      ${c.pricePerDay}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          c.available
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {c.available ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditing(c);
                            setShowForm(true);
                          }}
                          className="px-3 py-1 text-xs rounded-md bg-yellow-400 text-white hover:bg-yellow-500 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c._id || c.id)}
                          className="px-3 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal Popup */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative animate-scaleIn">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {editing ? "Edit Car" : "Add New Car"}
              </h2>

              {/* Car Form */}
              <CarForm
                existingCar={editing}
                onCarAdded={(c) => {
                  if (editing) {
                    setCars((prev) =>
                      prev.map((x) =>
                        (x._id || x.id) === (c._id || c.id) ? c : x
                      )
                    );
                  } else {
                    setCars((prev) => [c, ...prev]);
                  }
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />

              {/* Close Button */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition text-lg"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
