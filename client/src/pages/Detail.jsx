import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { IndianRupee, Fuel, Gauge, Users, CarFront, CalendarDays } from "lucide-react";
import { error } from "../services/toast";
import { getCar } from "../services/car";
import { absUrl } from "../services/api";

export default function Detail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCar() {
      try {
        setLoading(true);
        if (location?.state?.car) {
          setCar(location.state.car);
          return;
        }
        const res = await getCar(id);
        setCar(res?.data || null);
      } catch (err) {
        console.error("Error fetching car details:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchCar();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-indigo-600 text-xl font-semibold">
        Loading car details...
      </div>
    );

  if (!car)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Car not found.
      </div>
    );

  return (
  <div className="min-h-screen bg-linear-to-br mt-7 from-indigo-50 via-white to-indigo-100">
      {/* Hero Image Section */}
      <div className="relative">
        <img
          src={
            absUrl(car.image) ||
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80"
          }
          alt={car.name}
          onError={(e) => {
            console.warn(`Image failed to load: ${car.image}`);
            e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80";
          }}
          className="w-full h-[60vh] object-cover"
        />
  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white">
          <h1 className="text-5xl font-bold drop-shadow-lg">
            {car.brand} {car.name}
          </h1>
          <p className="text-lg text-gray-200 mt-2">{car.type}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-indigo-100">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column — Main Info */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <CarFront className="w-6 h-6 text-indigo-600" />
                Vehicle Overview
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {car.description ||
                  `The ${car.brand} ${car.name} offers a perfect blend of style, comfort, and performance. Ideal for city drives or long trips, it ensures a smooth and enjoyable journey.`}
              </p>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-indigo-50 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
                  <Gauge className="w-6 h-6 mx-auto text-indigo-600 mb-2" />
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-semibold text-gray-800">{car.type}</p>
                </div>

                <div className="bg-indigo-50 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
                  <Fuel className="w-6 h-6 mx-auto text-indigo-600 mb-2" />
                  <p className="text-sm text-gray-500">Fuel Type</p>
                  <p className="font-semibold text-gray-800">{car.fuelType || "Petrol"}</p>
                </div>

                <div className="bg-indigo-50 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
                  <Users className="w-6 h-6 mx-auto text-indigo-600 mb-2" />
                  <p className="text-sm text-gray-500">Seats</p>
                  <p className="font-semibold text-gray-800">{car.seats || 5}</p>
                </div>

                <div className="bg-indigo-50 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
                  <CalendarDays className="w-6 h-6 mx-auto text-indigo-600 mb-2" />
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p className="font-semibold text-gray-800">{car.transmission || "Manual"}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Features</h3>
                <ul className="grid sm:grid-cols-2 gap-2 text-gray-600 list-disc pl-5">
                  <li>Air Conditioning</li>
                  <li>Bluetooth Connectivity</li>
                  <li>ABS Brakes</li>
                  <li>Rear Parking Sensors</li>
                  <li>Power Steering</li>
                  <li>Keyless Entry</li>
                </ul>
              </div>
            </div>

            {/* Right Column — Price & Booking */}
            <div className="bg-linear-to-br from-indigo-600 to-indigo-800 text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
              <div>
                <p className="text-gray-200 text-sm mb-1">Price per day</p>
                <h2 className="text-4xl font-bold flex items-center gap-1 mb-4">
                  ₹{car.pricePerDay}
                </h2>

                <p className="text-gray-300 text-sm mb-4">
                  Inclusive of basic insurance & taxes.
                </p>

                <p className="text-sm mb-1">Availability:</p>
                <p
                  className={`font-semibold text-lg ${
                    car.available ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {car.available ? "Available" : "Not Available"}
                </p>
              </div>

              <button
                onClick={() => {
                  if (!car.available) {
                    error('This car is currently not available for booking.');
                    return;
                  }
                  navigate("/book", { state: { car } });
                }}
                disabled={!car.available}
                className={`mt-6 py-3 w-full rounded-xl font-semibold shadow-lg transition text-center ${
                  car.available
                    ? "bg-white text-indigo-700 hover:bg-gray-100"
                    : "bg-gray-400 cursor-not-allowed text-white"
                }`}
              >
                {car.available ? "Book Now" : "Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
