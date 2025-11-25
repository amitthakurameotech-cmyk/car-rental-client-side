import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { verifyCheckoutSession } from "../services/payment";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const bookingId = searchParams.get("bookingId");
  const navigate = useNavigate();

  const [status, setStatus] = useState("Verifying payment...");
  const [details, setDetails] = useState(null);
  const [result, setResult] = useState("loading"); 
  // loading | success | error

  useEffect(() => {
    if (!sessionId || !bookingId) {
      setStatus("Missing session or booking id.");
      setResult("error");
      setTimeout(() => navigate("/mybooking"), 2500);
      return;
    }

    async function confirm() {
      try {
        setStatus("Checking payment with server...");
        console.log(`Verifying payment - sessionId: ${sessionId}, bookingId: ${bookingId}`);
        const res = await verifyCheckoutSession(sessionId, bookingId);
        console.log("Payment verification response:", res);

        if (res.data && res.data.success) {
          setResult("success");
          setStatus("Payment confirmed! Thank you for your booking.");
          setDetails(res.data);
          console.log("✅ Payment verified successfully");
        } else {
          setResult("error");
          setStatus(`Payment not confirmed. ${res.data?.message || "Check your booking."}`);
          console.warn("Payment verification failed:", res.data);
        }
      } catch (err) {
        setResult("error");
        console.error("Error verifying payment:", err);
        setStatus(`Error: ${err.message || "Could not verify payment"}. Redirecting...`);
      } finally {
        setTimeout(() => navigate("/cars"), 3500);
      }
    }

    confirm();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 text-center"
      >
        {/* Status Icon */}
        <div className="flex justify-center mb-4">
          {result === "loading" && <Loader2 className="animate-spin w-14 h-14 text-blue-600" />}
          {result === "success" && <CheckCircle className="w-16 h-16 text-green-600" />}
          {result === "error" && <XCircle className="w-16 h-16 text-red-600" />}
        </div>

        <h2 className="text-2xl font-bold mb-2">
          {result === "success" ? "Payment Successful 🎉" : result === "error" ? "Payment Failed" : "Processing Payment"}
        </h2>

        <p className="text-gray-600 mb-4">{status}</p>

        {/* Payment Details */}
        {details && details.payment && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-gray-50 p-5 rounded-xl shadow-inner"
          >
            <h3 className="text-lg font-semibold mb-3 text-left">Payment Details</h3>

            <div className="grid grid-cols-2 gap-3 text-left text-gray-700">
              <div>
                <strong>Amount:</strong><br /> ₹{details.payment.amount}
              </div>
              <div>
                <strong>Status:</strong><br /> {details.payment.status}
              </div>
              <div>
                <strong>Card:</strong><br />
                {details.payment.cardBrand} ••••{details.payment.cardLast4}
              </div>
              <div>
                <strong>Booking:</strong><br />
                {details.payment.booking?.pickupLocation} → {details.payment.booking?.dropLocation}
              </div>
            </div>
          </motion.div>
        )}

        {/* Auto Redirect Message */}
        <p className="text-sm text-gray-500 mt-6">
          Redirecting you shortly...
        </p>
      </motion.div>
    </div>
  );
}
