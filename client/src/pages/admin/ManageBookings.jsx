import React, { useEffect, useState } from 'react';
import { getBookings, updateBooking, deleteBooking, approveCancelRequest } from '../../services/booking';
import { success, error as toastError } from '../../services/toast';
import AdminLayout from '../../component/AdminLayout';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [finalizedIds, setFinalizedIds] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await getBookings();
      const data = res?.data || [];
      const list = Array.isArray(data) ? data : data.data || [];
      setBookings(list);
      // mark bookings with finalized statuses so approve/reject buttons are hidden
      const FINAL_STATUSES = ['approved', 'confirmed', 'rejected', 'cancel', 'canceled', 'cancelled'];
      const finalized = list
        .filter((b) => FINAL_STATUSES.includes((b.status || '').toString().toLowerCase()))
        .map((b) => b._id || b.id);
      setFinalizedIds(finalized);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function setStatus(b, status) {
    const id = b._id || b.id;
    setLoadingId(id);
    try {
      // Use the backend PATCH /approve/:id route for approve/cancel actions
      await approveCancelRequest(id, { status });
      success(`Booking ${status}`);
      // mark this booking as finalized so approve/reject buttons are hidden (show only delete)
      setFinalizedIds((prev) => Array.from(new Set([...prev, id])));
      // refresh list in background
      load();
    } catch (e) {
      console.error('Approve/Reject failed', e);
      const msg = e?.response?.data?.message || e.message || 'Failed to update booking status';
      toastError(msg);
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDelete(b) {
    if (!confirm('Delete this booking?')) return;
    try {
      await deleteBooking(b._id || b.id);
      load();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <AdminLayout>
      <div className="px-4 py-6 bg-gray-50 min-h-screen text-gray-800 transition-colors duration-300">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Manage Bookings</h1>

        <div className="bg-white rounded-2xl border border-gray-200 shadow p-4 hover:shadow-md transition">
          {loading ? (
            <div className="text-center py-6 text-gray-500">Loading...</div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-6 text-gray-500">No bookings found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-700 border-b">
                  <tr>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3 text-left">Car</th>
                    <th className="p-3 text-left">From</th>
                    <th className="p-3 text-left">To</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr
                      key={b._id || b.id}
                      className="border-b hover:bg-blue-50 transition cursor-pointer"
                    >
                      <td className="p-3">{b.userName || b.user?.name || 'N/A'}</td>
                      <td className="p-3">{b.carName || b.car?.name || 'N/A'}</td>
                      <td className="p-3">{new Date(b.startDate).toLocaleDateString()}</td>
                      <td className="p-3">{new Date(b.endDate).toLocaleDateString()}</td>
                      <td className="p-3 text-green-600 font-medium">${b.totalPrice}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            b.status === 'approved'
                              ? 'bg-green-100 text-green-700'
                              : b.status === 'rejected'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-2">
                          { /* If booking is finalized (approved/confirmed/rejected/cancel) hide approve/reject and show only Delete */ }
                          {!(finalizedIds.includes(b._id || b.id) || ['approved','confirmed','rejected','cancel','canceled','cancelled'].includes((b.status||'').toString().toLowerCase())) ? (
                            <>
                              <button
                                onClick={() => setStatus(b, 'approved')}
                                className="px-3 py-1 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600 transition disabled:opacity-60"
                                disabled={loadingId === (b._id || b.id)}
                              >
                                {loadingId === (b._id || b.id) ? 'Processing...' : 'Approve'}
                              </button>
                              <button
                                onClick={() => setStatus(b, 'rejected')}
                                className="px-3 py-1 rounded-lg bg-yellow-400 text-white text-xs font-medium hover:bg-yellow-500 transition disabled:opacity-60"
                                disabled={loadingId === (b._id || b.id)}
                              >
                                {loadingId === (b._id || b.id) ? 'Processing...' : 'Reject'}
                              </button>
                            </>
                          ) : null}

                          <button
                            onClick={() => handleDelete(b)}
                            className="px-3 py-1 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition disabled:opacity-60"
                            disabled={loadingId === (b._id || b.id)}
                          >
                            {loadingId === (b._id || b.id) ? 'Processing...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
