import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", formData);
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ fullName: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-linear-to-br mt-5 from-blue-50 via-white to-indigo-100 flex flex-col justify-center items-center px-6 py-16">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-3">
          Contact <span className="text-indigo-600">AutoDrive Rentals</span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Have a question, feedback, or need assistance? We’re here 24/7 to help
          you with your car rental journey.
        </p>
      </motion.div>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Info Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-linear-to-br from-indigo-600 to-blue-600 text-white md:w-1/2 p-10 flex flex-col justify-center"
        >
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-indigo-100 mb-6 leading-relaxed">
            We value our customers and would love to hear from you. Whether it’s
            about booking, feedback, or partnership opportunities — our team is
            just a message away.
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="text-yellow-300 w-6 h-6" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="text-yellow-300 w-6 h-6" />
              <span>support@autodrive.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-yellow-300 w-6 h-6" />
              <span>123 AutoDrive Plaza, Mumbai, India</span>
            </div>
          </div>

          <p className="mt-8 text-sm text-indigo-200">
            Office Hours: Monday - Sunday | 8:00 AM - 10:00 PM
          </p>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <Send className="w-5 h-5" />
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 w-full max-w-6xl"
      >
        <iframe
          title="Company Location"
          className="w-full h-72 rounded-2xl shadow-lg"
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.819264536951!2d72.877655974691!3d19.076090382120446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c630e5c91f77%3A0x7b4df3b3ed8f748f!2sMumbai%20International%20Airport!5e0!3m2!1sen!2sin!4v1708523098871!5m2!1sen!2sin"
        ></iframe>
      </motion.div>

      {/* Footer Section */}
      <footer className="mt-16 w-full bg-white shadow-inner">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-3">
              AutoDrive Rentals
            </h3>
            <p className="text-gray-600 text-sm">
              Reliable car rentals for every journey. Comfort, convenience, and
              care — that’s our promise to you.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <a href="/" className="hover:text-indigo-600 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-indigo-600 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-indigo-600 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="/cars" className="hover:text-indigo-600 transition">
                  Cars
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-3">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-sky-500">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} AutoDrive Rentals — All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default Contact;
