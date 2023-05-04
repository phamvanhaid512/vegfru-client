import React from 'react'
import oip from "../../img/OIP.jpeg"
import { ToastContainer, toast } from 'react-toastify';

const EditAddress = ({singleAddress}) => {

    // const address = singleAddress.address + " " singleAddress.place;

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.info('This feature is in progress!', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    
    return (
        <div>
            <ToastContainer />
            <div className='flex flex-col space-y-14 md:pr-10 md:pl-48'>
                <div className='flex justify-between items-center mt-16'>
                    <div>
                        <h3 className='text-4xl font-semibold mb-2'>Edit <span className='text-green-500'> Address</span></h3>
                        <div class="border-b-2 border-black mt-4 w-8"></div>
                    </div>
                    <img src={oip} className='h-16 w-16' />
                </div>
                {/* Form */}
                <div className="mt-6">
                    <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
                        <div className=''>

                            <div className="border-r border-l border-t border-b">
                                <p htmlFor="email" className="px-4 pt-4 block text-xs font-medium text-gray-400">
                                    Address
                                </p>
                                <input
                                    value={singleAddress.address + " " + singleAddress.place}
                                    id="text"
                                    name="text"
                                    type="text"
                                    placeholder=''
                                    className="block w-full appearance-none outline-none px-4 py-4 placeholder-gray-400 shadow-sm sm:text-sm"
                                />
                            </div>
                            <div className="border-r border-l border-b">
                                <p htmlFor="email" className="px-4 pt-4 block text-xs font-medium text-gray-400">
                                    Landmark
                                </p>
                                <input
                                    value={singleAddress.landmark}
                                    id="text"
                                    name="text"
                                    type="text"
                                    placeholder=''
                                    className="block w-full appearance-none outline-none  px-4 py-4 placeholder-gray-400 shadow-sm sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="mt-4 flex w-full justify-center border-transparent bg-green-500 py-4 px-4 text-sm font-medium text-white shadow-sm "
                            >
                                Save Address 
                            </button>
                            <p className='text-xs mt-2 text-[#686b78] font-normal'>By clicking on Save Address , you can change <span className='text-black'>your address.</span></p>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default EditAddress
