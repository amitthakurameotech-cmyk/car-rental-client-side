import React, { useEffect, useState } from "react";
import { getUserPaymentHistory } from "../services/payment";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPayments() {
      try {
        // Get userId from localStorage or context (adjust as needed)
        const userId = localStorage.getItem("id");
        if (!userId) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }
        const response = await getUserPaymentHistory(userId);
        if (response.data && response.data.success) {
          setPayments(response.data.payments);
        } else {
          setError("No payment history found.");
        }
      } catch (err) {
        setError("Failed to load payment history.");
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, []);

  if (loading) {
    return <div>Loading payment history...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
console.log(payments,"payment");
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>
      {payments.length === 0 ? (
        <p>No payment history found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Currency</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Card Brand</th>
              <th className="border border-gray-300 px-4 py-2">Card Last4</th>
              <th className="border border-gray-300 px-4 py-2">Booking</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td className="border border-gray-300 px-4 py-2">{new Date(payment.createdAt).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">₹{payment.amount}</td>
                <td className="border border-gray-300 px-4 py-2">{payment.currency}</td>
                <td className="border border-gray-300 px-4 py-2">{payment.status}</td>
                <td className="border border-gray-300 px-4 py-2">{payment.cardBrand || '-'}</td>
                <td className="border border-gray-300 px-4 py-2">{payment.cardLast4 || '-'}</td>
                <td className="border border-gray-300 px-4 py-2">{payment.booking ? `${payment.booking.pickupLocation} → ${payment.booking.dropLocation}` : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}