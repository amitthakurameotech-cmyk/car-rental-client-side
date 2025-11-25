import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { createPaymentIntent, confirmPaymentOnServer } from '../services/payment'

// <-- Replace with your publishable key provided
const PUBLISHABLE_KEY = 'pk_test_51RY4AxPVTaanfxbkmRzdavqDMZQ4V3MhHaTSeIpTJ7GtoM9UNAn3a6y3oj6wsvVreqNYw3xLJTrMANCJnMlx9UGr00J8qWGL7f'

const stripePromise = loadStripe(PUBLISHABLE_KEY)

function CheckoutForm({ bookingId, amount, onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!stripe || !elements) return

    setLoading(true)

    try {
      // 1) Ask backend to create a payment intent for the booking
      const res = await createPaymentIntent(bookingId)
      const clientSecret = res?.data?.clientSecret || res?.data?.data?.clientSecret
      if (!clientSecret) throw new Error('No clientSecret returned from server')

      // 2) Confirm card payment with Stripe using CardElement
      const card = elements.getElement(CardElement)
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
        },
      })

      if (result.error) {
        setError(result.error.message)
        setLoading(false)
        return
      }

      if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        // 3) Optionally inform backend the payment succeeded
        try {
          await confirmPaymentOnServer({ bookingId, paymentIntentId: result.paymentIntent.id })
        } catch (err) {
          // Not fatal for UI — log and continue
          console.warn('confirmPaymentOnServer error', err)
        }

        setSuccess('Payment successful — thank you!')
        // call parent onSuccess if provided
        if (typeof onSuccess === 'function') onSuccess(result.paymentIntent)
      } else {
        setError('Payment not completed')
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || err.message || 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg disabled:opacity-60"
      >
        {loading ? 'Processing…' : `Pay ₹${amount || '0'}`}
      </button>
    </form>
  )
}

export default function PaymentFormWrapper({ bookingId, amount, onSuccess }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm bookingId={bookingId} amount={amount} onSuccess={onSuccess} />
    </Elements>
  )
}
