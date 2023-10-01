import React from 'react'
import { Link } from 'react-router-dom'

const success = () => {
  return (
    <>
      <div class="bg-gray-100">
        <div class="min-h-screen flex items-center justify-center">
          <div class="bg-white shadow-md rounded-md p-8 max-w-md w-full space-y-4">
            <img src="https://res.cloudinary.com/amritrajmaurya/image/upload/v1696064957/logo_ez9ecr.png" alt="Your Application Logo" class="mx-auto h-16 w-18" />
            <h2 class="text-3xl font-semibold text-center text-green-600">Payment Successful!</h2>
            <p class="text-center text-gray-600">Thank you for your payment. Your order has been successfully processed.</p>
            <div class="text-center">
              <a class="text-blue-500 hover:underline">View Receipt</a>
            </div>
            <div class="text-center">
              <Link to="/dashboard" class="text-gray-700 hover:text-gray-900 font-semibold text-md underline">Back to Main Page</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default success
