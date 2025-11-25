import React, { useEffect, useState } from "react";
import { getCars } from "../services/car";

export default function CarList() {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
  const res = await getCars();
  setCars(res.data.data || res.data);
    } catch {
      alert("Error fetching cars");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Available Cars</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold text-indigo-600">{car.name}</h3>
            <p className="text-gray-700">{car.brand} — {car.type}</p>
            <p className="text-gray-600 text-sm">Fuel: {car.fuelType} | {car.transmission}</p>
            <p className="mt-2 font-semibold text-gray-900">₹{car.pricePerDay}/day</p>
            <p className="text-gray-500 text-sm">{car.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
