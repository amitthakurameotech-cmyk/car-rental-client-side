import api from './api'

export const getBookings = (params) => api.get('/bookings')

// Send the user id as a query param (or fetch all when omitted).


// Normalized helper that always returns { data: [...] } for a user's bookings (or all bookings if no userId)
export async function getBookingDataByUserId(userId) {
  const res = userId ? await api.get('/bookings', { params: { userId } }) : await api.get('/bookings')
  let data = res?.data ?? []

  // unwrap common nested shapes and ensure an array is returned
  if (data && !Array.isArray(data) && data.data) data = data.data
  if (Array.isArray(data) && data.every((i) => i && Array.isArray(i.data))) {
    data = data.reduce((acc, item) => acc.concat(item.data || []), [])
  }
  if (!Array.isArray(data) && data && Array.isArray(data.bookings)) data = data.bookings
  if (data && !Array.isArray(data)) data = [data]

  return { data: Array.isArray(data) ? data : [] }
}
export const createBooking = (data) => api.post('/bookings', data)
export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data)
export const deleteBooking = (id) => api.delete(`/bookings/${id}`)
export const getBooking = (id) => api.get(`/bookings/${id}`)
// Approve or cancel (reject) a booking using backend endpoint: PATCH /approve/:id
export async function approveCancelRequest(id, data) {
  // try the most common expected shape first
  try {
    return await api.patch(`/approve/${id}`, data);
  } catch (err) {
    // If backend returned 400 (bad request), try a few alternative payload shapes that some APIs expect.
    if (err?.response?.status === 400) {
      const altPayloads = [];

      // if caller passed { status: 'approved' } try { action: 'approve' }
      if (data && data.status) {
        altPayloads.push({ action: data.status });
        altPayloads.push({ action: data.status === 'approved' ? 'approve' : data.status });
      }

      // some APIs expect { approved: true } / { approved: false }
      if (data && data.status) {
        altPayloads.push({ approved: data.status === 'approved' });
      }

      // try with no body
      altPayloads.push(undefined);

      for (const payload of altPayloads) {
        try {
          // axios ignores undefined body for patch when omitted
          if (typeof payload === 'undefined') {
            return await api.patch(`/approve/${id}`);
          }
          return await api.patch(`/approve/${id}`, payload);
        } catch (e) {
          // continue to next alternative
        }
      }
    }

    // rethrow the original error if nothing worked
    throw err;
  }
}

export default {
  getBookings,
  getBookingDataByUserId,
  createBooking,
  updateBooking,
  deleteBooking,
  approveCancelRequest,
}
