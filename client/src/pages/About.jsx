import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <div className="min-h-screen bg-linear-to-br mt-5 from-gray-100 via-white to-gray-200 text-gray-800">
      {/* Hero Section */}
      <section className="py-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-blue-600 mb-4"
        >
          About <span className="text-indigo-600">DriveEase Rentals</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          At DriveEase Rentals, we believe in making your journey seamless, comfortable, and memorable.
          Whether you’re on a family trip, business travel, or simply exploring the city — we’ve got the perfect car ready.
        </motion.p>
      </section>

      {/* Company Story Section */}
      <section className="px-6 md:px-20 py-12 flex flex-col md:flex-row items-center gap-10">
        <motion.img
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80"
          alt="DriveEase Rentals story"
          className="rounded-2xl shadow-lg w-full md:w-1/2 object-cover"
        />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Journey</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded with a simple mission: to provide reliable, transparent car rental services at an excellent value. Starting with a small fleet, we’ve grown to serve multiple cities with hundreds of vehicles.
          </p>
          <p className="text-gray-600 mt-4">
            With online booking, 24/7 customer support, and full maintenance of each vehicle — we aim to be your partner on every road you take.
          </p>
        </motion.div>
      </section>

      {/* Features / Services Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-8">Why Choose DriveEase?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Example feature cards */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Wide Range of Cars</h3>
              <p className="text-gray-600 text-sm">From compact hatchbacks to luxury sedans, choose the vehicle that fits your trip.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">We’re here to help anytime — day or night.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Transparent Pricing</h3>
              <p className="text-gray-600 text-sm">No hidden fees, clear terms, and flexible rental options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 md:px-20 py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          Our Mission
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          To make car rental easy for everyone — reliable vehicles, straightforward booking, and respectful service. Because your time is precious, and your comfort matters.
        </motion.p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p>© {new Date().getFullYear()} DriveEase Rentals. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;
