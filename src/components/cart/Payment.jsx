import React from 'react'

const Payment = () => {
    return (
        <div>
            <section class="text-gray-600 body-font">
                <h2 className='text-xl font-semibold '>Choose payment method</h2>
                <div className='flex flex-row md:flex-col space-x-2 md:space-x-0'>
                    <button
                        type="submit"
                        className="mt-3 flex w-full justify-center border-2 border-green-500 py-2  md:py-4 px-4 text-xs md:text-sm font-semibold text-green-500 shadow-sm rounded-lg "
                    >
                        Cash on delivery
                    </button>
                    <button
                        type="submit"
                        className="mt-3 flex w-full justify-center border-transparent bg-green-500 py-2  md:py-4 px-4 text-xs md:text-sm font-semibold text-white shadow-sm rounded-lg "
                    >
                        UPI/Netbanking/Credit/Debit-Card
                    </button>
                </div>
                <div className='mt-14 md:hidden'></div>
            </section>
        </div>
    )
}

export default Payment
