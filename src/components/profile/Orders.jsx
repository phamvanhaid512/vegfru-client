import React from 'react'

const Orders = () => {
    return (
        <section class="text-gray-600 body-font cursor-pointer" onClick={() => console.log("Order no 1")}>
            <div class="container px-5 sm:px-1 mx-auto">
                <div class="flex items-center border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col justify-between">
                    <div class="sm:w-16 sm:h-16 h-10 w-10 sm:mr-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 flex-shrink-0">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="sm:w-6 sm:h-6 w-6 h-6" viewBox="0 0 24 24">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                    </div>
                    <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                        <h2 class="text-gray-900 text-lg title-font font-medium">Ramesh Patnayak</h2>
                        <small>Hussainpur, Madurdaha, Kolkata, 7001017</small>
                        <p class="leading-relaxed text-base">
                            <div class="mt-1">
                                <small>3 Items</small>
                                <p>$16.00</p>
                            </div>
                        </p>
                        <a class="mt-3 font-semibold inline-flex items-center">Delivered
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="text-green-500 ml-2 w-5 h-5 ">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Orders
