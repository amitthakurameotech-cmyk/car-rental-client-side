import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { getBooking } from '../services/booking'
import { createCheckoutSession } from '../services/payment'
import { AlertCircle, Loader } from 'lucide-react'

export default function Checkout() {
  const { bookingId } = useParams()
  console.log(bookingId);
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const booking = location.state?.booking

  useEffect(() => {
    async function initiateStripeCheckout() {
      try {
        setLoading(true)
        setError(null)

        // Fetch booking if not passed via state
        let bookingData = booking
        if (!bookingData) {
          const res = await getBooking(bookingId)
          bookingData = res?.data?.data || res?.data
        }

        if (!bookingData) {
          throw new Error('Booking not found')
        }

        console.log('Booking data:', bookingData)

        // Create Stripe Checkout Session on backend
        const sessionRes = await createCheckoutSession(bookingId)
        console.log('Checkout session response:', sessionRes)

        // Extract session URL from response
        const sessionUrl = sessionRes?.data?.sessionUrl || 
                          sessionRes?.data?.url || 
                          sessionRes?.sessionUrl ||
                          sessionRes?.url

        if (!sessionUrl) {
          console.error('No sessionUrl in response:', sessionRes)
          throw new Error('Failed to create checkout session - no URL returned')
        }

        // Redirect to Stripe Checkout hosted page
        console.log('Redirecting to Stripe Checkout:', sessionUrl)
        window.location.href = sessionUrl
      } catch (err) {
        console.error('Checkout error:', err)
        setError(err.response?.data?.message || err.message || 'Failed to initiate checkout')
        setLoading(false)
      }
    }

    if (bookingId) {
      initiateStripeCheckout()
    }
  }, [bookingId, booking])

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {loading && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-indigo-100">
            <div className="flex justify-center mb-4">
              <Loader className="w-10 h-10 text-indigo-600 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Redirecting to Stripe...</h2>
            <p className="text-gray-600">Please wait while we prepare your checkout page</p>
            <p className="text-xs text-gray-500 mt-4">Do not refresh this page</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200">
            <div className="flex items-start gap-4 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-red-700 mb-2">Checkout Error</h2>
                <p className="text-red-600 text-sm mb-4">{error}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/mybooking')}
                className="flex-1 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Back to My Bookings
              </button>
              <button
                onClick={() => {
                  setLoading(true)
                  setError(null)
                  window.location.reload()
                }}
                className="flex-1 bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
