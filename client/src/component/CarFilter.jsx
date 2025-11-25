// src/component/CarFilter.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CarFilter({ cars, onFilter }) {
  const [filters, setFilters] = useState({
    brand: "",
    maxPrice: "",
    available: "",
  });

  // Extract unique brands dynamically
  const brands = [...new Set(cars.map((c) => c.name?.split(" ")[0] || "Other"))];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Notify parent when filters change
  useEffect(() => {
    onFilter(filters);
  }, [filters]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-5 rounded-2xl shadow-md h-fit sticky top-20"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Filter Cars</h2>

      {/* Brand Filter */}
      <div className="mb-4 mt-5 ">
        <label className="block text-gray-600 font-medium mb-2">Brand</label>
        <select
          name="brand"
          value={filters.brand}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
        >
          <option value="">All Brands</option>
          {brands.map((b, idx) => (
            <option key={idx} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">
          Max Price (₹/day)
        </label>
        <input
          type="number"
          name="maxPrice"
          placeholder="e.g. 5000"
          value={filters.maxPrice}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Availability Filter */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">
          Availability
        </label>
        <select
          name="available"
          value={filters.available}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
        >
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </div>

      <button
        onClick={() => setFilters({ brand: "", maxPrice: "", available: "" })}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg mt-2 font-medium"
      >
        Reset Filters
      </button>
    </motion.div>
  );
}
