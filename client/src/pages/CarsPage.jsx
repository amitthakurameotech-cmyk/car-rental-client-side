
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getCars } from "../services/car";
import { error } from "../services/toast";
import { absUrl } from "../services/api";
import CarFilter from "../component/CarFilter";

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await getCars();
        const data = res?.data;
        let list = [];

        if (Array.isArray(data)) list = data;
        else if (Array.isArray(data?.data)) list = data.data;
        else if (Array.isArray(data?.cars)) list = data.cars;
        else if (Array.isArray(data?.items)) list = data.items;

        setCars(list);
        setFilteredCars(list);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // 🔍 Handle filter logic
  const handleFilterChange = (filters) => {
    let list = [...cars];

    if (filters.brand)
      list = list.filter((car) =>
        car.name?.toLowerCase().includes(filters.brand.toLowerCase())
      );

    if (filters.maxPrice)
      list = list.filter((car) => Number(car.pricePerDay) <= Number(filters.maxPrice));

    if (filters.available)
      list = list.filter(
        (car) => String(car.available) === filters.available
      );

    setFilteredCars(list);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-200 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Filter */}
        <div className="col-span-1">
          <CarFilter cars={cars} onFilter={handleFilterChange} />
        </div>

        {/* Cars List */}
        <div className="col-span-1 lg:col-span-3">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl mt-6 font-extrabold text-center mb-12 text-gray-800 tracking-tight"
          >
            Explore Our <span className="text-blue-600">Premium Cars</span>
          </motion.h1>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <span className="text-lg text-blue-600 animate-pulse">Loading available cars...</span>
            </div>
          ) : !Array.isArray(filteredCars) || filteredCars.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 text-lg py-20 bg-white rounded-xl shadow-lg"
            >
              No available cars.
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2"
                >
                  <img
                    src={
                      absUrl(car.image) ||
                      "https://i.pinimg.com/736x/d7/1e/fc/d71efc19a1e7a55da84be087afcea0a5.jpg"
                    }
                    alt={car.name}
                    onError={(e) => {
                      console.warn(`Image failed to load: ${car.image}`);
                      e.target.src = "https://i.pinimg.com/736x/d7/1e/fc/d71efc19a1e7a55da84be087afcea0a5.jpg";
                    }}
                    className="w-full h-56 object-cover rounded-t-2xl"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                      {car.name || "Unnamed Car"}
                    </h2>
                    <p className="text-gray-500 mb-1">
                      <strong>Model:</strong> {car.model || "N/A"}
                    </p>
                    <p className="text-gray-500 mb-4">
                      <strong>Price/Day:</strong>{" "}
                      <span className="text-blue-600 font-semibold">
                        ₹{car.pricePerDay || "0"}
                      </span>
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-5 py-2 rounded-lg shadow transition ${
                          car.available
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                        onClick={() => {
                          if (!car.available) {
                            error("This car is not available for booking.");
                            return;
                          }
                          navigate("/book", { state: { car } });
                        }}
                        disabled={!car.available}
                      >
                        Book Now
                      </motion.button>

                      <button
                        className="text-blue-600 hover:text-blue-800 font-medium"
                        onClick={() =>
                          navigate(`/detail/${car._id}`, {
                            state: { car },
                          })
                        }
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
