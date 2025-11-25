// import React from "react";
// import { motion } from "framer-motion";
// import { Car, MapPin, Calendar, PhoneCall, CheckCircle } from "lucide-react";

// export default function Home() {
//   let user = null;
//   try {
//     const raw = localStorage.getItem("user");
//     if (raw) user = JSON.parse(raw);
//   } catch (e) {}

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section with Background */}
//       <section
//         className="relative h-[90vh] flex items-center justify-center bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1605559424843-9e4e3b45a75c?auto=format&fit=crop&w=1500&q=80')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/60"></div>

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9 }}
//           className="relative z-10 text-center text-white max-w-3xl px-6"
//         >
//           <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
//             Premium <span className="text-blue-400">Car Rentals</span> for Every Journey
//           </h1>
//           <p className="mt-4 text-lg text-gray-200">
//             Drive in comfort and style with DriveEase — your trusted car rental service.
//             From luxury sedans to sporty SUVs, we’ve got the ride for every road.
//           </p>

//           <div className="mt-8 flex justify-center gap-4">
//             <motion.a
//               href="/cars"
//               whileHover={{ scale: 1.05 }}
//               className="px-6 py-3 bg-blue-600 hover:bg-blue-700 font-semibold rounded-full shadow-md transition"
//             >
//               Browse Cars
//             </motion.a>
//             <motion.a
//               href="/contact"
//               whileHover={{ scale: 1.05 }}
//               className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-md transition"
//             >
//               Contact Us
//             </motion.a>
//           </div>
//         </motion.div>
//       </section>

//       {/* Welcome Section */}
//       <section className="max-w-5xl mx-auto text-center py-16 px-6">
//         <motion.h2
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl md:text-4xl font-bold text-gray-800"
//         >
//           Welcome{user ? `, ${user.fullName || user.email}` : " to DriveEase Rentals"}
//         </motion.h2>
//         <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//           {user
//             ? "Manage your bookings, explore new cars, and make your next ride unforgettable."
//             : "Sign up to rent cars effortlessly, with flexible plans, premium support, and top-notch vehicles."}
//         </p>
//       </section>

//       {/* Why Choose Us Section */}
//       <section className="bg-linear-to-r from-blue-50 to-indigo-50 py-16">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8 px-6">
//           {[
//             {
//               icon: Car,
//               title: "Wide Car Range",
//               desc: "Choose from luxury, economy, and electric vehicles for every budget.",
//             },
//             {
//               icon: Calendar,
//               title: "Flexible Booking",
//               desc: "Book hourly, daily, or weekly — full flexibility for your schedule.",
//             },
//             {
//               icon: MapPin,
//               title: "Pick-up Anywhere",
//               desc: "Convenient pickup & drop-off points across major cities.",
//             },
//             {
//               icon: PhoneCall,
//               title: "24/7 Assistance",
//               desc: "Round-the-clock customer support for your peace of mind.",
//             },
//           ].map((item, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ y: -6 }}
//               className="bg-white p-6 rounded-2xl shadow-lg text-center transition"
//             >
//               <item.icon className="mx-auto w-10 h-10 text-blue-600 mb-3" />
//               <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
//               <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Featured Cars */}
//       <section className="py-20 max-w-6xl mx-auto px-6">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//           Featured <span className="text-blue-600">Vehicles</span>
//         </h2>
//         <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
//           {[
//             {
//               img: "https://i.pinimg.com/736x/06/eb/50/06eb508d2950613f694b0e92e169d1c1.jpg",
//               name: "Tesla Model S",
//               price: "₹7,999 / Day",
//             },
//             {
//               img: "https://i.pinimg.com/736x/b6/ac/26/b6ac26e6ddbcf4adc924c95083089f45.jpg",
//               name: "BMW X4",
//               price: "₹6,499 / Day",
//             },
//             {
//               img: "https://i.pinimg.com/736x/d7/1e/fc/d71efc19a1e7a55da84be087afcea0a5.jpg",
//               name: "Audi A6",
//               price: "₹5,999 / Day",
//             },
//           ].map((car, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.03 }}
//               className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
//             >
//               <img src={car.img} alt={car.name} className="w-full h-56 object-cover" />
//               <div className="p-5">
//                 <h3 className="text-xl font-semibold text-gray-800">{car.name}</h3>
//                 <p className="text-gray-600 mt-1">{car.price}</p>
//                 <motion.a
//                   href="/book"
//                   whileHover={{ scale: 1.05 }}
//                   className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
//                 >
//                   Book Now
//                 </motion.a>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Why DriveEase */}
//       <section className="bg-white py-20 text-center px-6">
//         <motion.h2
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl font-bold text-gray-800"
//         >
//           Why Choose <span className="text-blue-600">DriveEase?</span>
//         </motion.h2>
//         <p className="mt-4 max-w-3xl mx-auto text-gray-600">
//           DriveEase is India’s most trusted car rental platform, offering affordable,
//           reliable, and comfortable rides for every traveler. Enjoy luxury, safety,
//           and transparency in every journey.
//         </p>

//         <div className="mt-10 flex flex-wrap justify-center gap-6">
//           {["No Hidden Charges", "Clean & Sanitized Cars", "Quick Booking Process", "Trusted by 10K+ Users"].map(
//             (point, i) => (
//               <motion.div
//                 key={i}
//                 whileHover={{ scale: 1.05 }}
//                 className="flex items-center bg-gray-100 px-5 py-3 rounded-full shadow-sm"
//               >
//                 <CheckCircle className="text-blue-600 mr-2" />
//                 <span className="text-gray-700 font-medium">{point}</span>
//               </motion.div>
//             )
//           )}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-linear-to-r from-blue-600 to-indigo-700 text-white text-center py-16">
//         <motion.h3
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="text-3xl md:text-4xl font-bold"
//         >
//           Your Next Ride Awaits 🚗
//         </motion.h3>
//         <p className="mt-3 text-blue-100">
//           Book your dream car today and experience the smoothest drive of your life.
//         </p>
//         <motion.a
//           href="/cars"
//           whileHover={{ scale: 1.1 }}
//           className="mt-6 inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
//         >
//           Book Now
//         </motion.a>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-8 text-center">
//         <p className="text-sm">
//           © {new Date().getFullYear()} <span className="font-semibold text-white">DriveEase Rentals</span>. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// }
import React from "react";
import { motion } from "framer-motion";
import {
  Car,
  MapPin,
  Calendar,
  PhoneCall,
  CheckCircle,
  Star,
  Shield,
  Timer,
  ArrowRight,
  Fuel,
  User,
} from "lucide-react";

export default function Home() {
  let user = null;
  try {
    const raw = localStorage.getItem("user");
    if (raw) user = JSON.parse(raw);
  } catch (e) {}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1605559424843-9e4e3b45a75c?auto=format&fit=crop&w=1500&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/70 to-black/20"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 text-center text-white max-w-3xl px-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold">
            Premium{" "}
            <span className="text-blue-400">Car Rentals</span> for Every Trip
          </h1>
          <p className="mt-6 text-lg opacity-90 leading-relaxed">
            Drive in comfort and enjoy a seamless rental experience. Choose from
            our premium fleet of well-maintained cars.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <motion.a
              href="/cars"
              whileHover={{ scale: 1.07 }}
              className="px-7 py-3 bg-blue-600 hover:bg-blue-700 font-semibold rounded-full shadow-xl"
            >
              Browse Cars
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.07 }}
              className="px-7 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-xl"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-6xl mx-auto px-6 -mt-16">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {[
            {
              icon: Car,
              title: "Browse Cars",
              link: "/cars",
              color: "text-blue-600",
            },
            {
              icon: Calendar,
              title: "My Bookings",
              link: "/mybookings",
              color: "text-green-600",
            },
            {
              icon: User,
              title: "About",
              link: "/about",
              color: "text-purple-600",
            },
            {
              icon: PhoneCall,
              title: "Contact Support",
              link: "/contact",
              color: "text-red-600",
            },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center text-center hover:shadow-2xl transition"
            >
              <item.icon className={`w-10 h-10 ${item.color} mb-3`} />
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Welcome Section */}
      <section className="max-w-5xl mx-auto text-center py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800"
        >
          Welcome{user ? `, ${user.fullName || user.email}` : " to DriveEase Rentals"}
        </motion.h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          {user
            ? "Manage your bookings, explore cars, and enjoy premium rides with ease."
            : "Create an account and start renting cars effortlessly with exciting offers!"}
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="bg-linear-to-r from-blue-50 to-indigo-50 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8 px-6">
          {[
            {
              icon: Shield,
              title: "Secure & Reliable",
              desc: "Safety-first approach with insurance & verified cars.",
            },
            {
              icon: Timer,
              title: "Instant Booking",
              desc: "Get your car confirmed in just a few clicks.",
            },
            {
              icon: Fuel,
              title: "Fuel Efficient Cars",
              desc: "Choose from the best mileage cars & save fuel costs.",
            },
            {
              icon: Star,
              title: "Top Rated Service",
              desc: "4.9/5 rated by 10,000+ happy customers.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
            >
              <item.icon className="mx-auto w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Featured <span className="text-blue-600">Vehicles</span>
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-10">
          {[
            {
              img: "https://i.pinimg.com/736x/06/eb/50/06eb508d2950613f694b0e92e169d1c1.jpg",
              name: "Tesla Model S",
              price: "₹7,999 / Day",
            },
            {
              img: "https://i.pinimg.com/736x/b6/ac/26/b6ac26e6ddbcf4adc924c95083089f45.jpg",
              name: "BMW X4",
              price: "₹6,499 / Day",
            },
            {
              img: "https://i.pinimg.com/736x/d7/1e/fc/d71efc19a1e7a55da84be087afcea0a5.jpg",
              name: "Audi A6",
              price: "₹5,999 / Day",
            },
          ].map((car, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl"
            >
              <img src={car.img} alt={car.name} className="w-full h-56 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">{car.name}</h3>
                <p className="text-gray-600 mt-1">{car.price}</p>

                <motion.a
                  href="/book"
                  whileHover={{ scale: 1.07 }}
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Book Now <ArrowRight size={18} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linear-to-r from-blue-600 to-indigo-700 text-white text-center py-20">
        <h3 className="text-3xl md:text-4xl font-bold">
          Your Next Ride Awaits 🚗
        </h3>
        <p className="mt-3 text-blue-100">
          Book your dream car today and enjoy a smooth driving experience.
        </p>

        <motion.a
          href="/cars"
          whileHover={{ scale: 1.1 }}
          className="mt-6 inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg"
        >
          Book Now
        </motion.a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">DriveEase Rentals</span>.
          All rights reserved.
        </p>
      </footer>
    </div>
  );
}
