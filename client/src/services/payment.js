import api from './api'

// Get payment history for a user
export const getUserPaymentHistory = (userId) => {
  return api.get(`/payments/user/${userId}`);
}

// Create Stripe Checkout Session and get the hosted checkout URL
// Backend should return { sessionUrl: 'https://checkout.stripe.com/c/pay/...' }
export const createCheckoutSession = (bookingId) => {
  return api.post(`/payments/create-intent/${bookingId}`)
}

// Confirm payment on backend after user returns from Stripe (optional)
export const confirmPaymentOnServer = (data) => {
  return api.post(`/payments/confirm`, data)
}

// Verify Stripe session and booking status
export const verifyCheckoutSession = (sessionId, bookingId) => {
  return api.get(`/payments/session/${sessionId}?bookingId=${bookingId}`);
}

export default {
  createCheckoutSession,
  confirmPaymentOnServer,
  verifyCheckoutSession,
  getUserPaymentHistory,
}
