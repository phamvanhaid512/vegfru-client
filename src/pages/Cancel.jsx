import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div class="bg-gray-100">
      <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white shadow-md rounded-md p-8 max-w-md w-full space-y-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <h2 class="text-3xl font-semibold text-center text-red-600">Payment Canceled</h2>
          <p class="text-center text-gray-600">Your payment has been canceled. If you have any questions, please contact our support team.</p>
          <div class="text-center">
            <Link to="/dashboard" class="text-gray-700 hover:text-gray-900 font-semibold text-md underline">Back to Main Page</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cancel
