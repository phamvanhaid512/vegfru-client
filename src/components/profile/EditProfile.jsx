import React, { useContext } from 'react'
import oip from "../../img/OIP.jpeg"
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const EditProfile = () => {

    const { user } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.info('This feature is in progress!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
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
            <div className='flex flex-col space-y-14 md:pl-10 md:pr-48'>
                <div className='flex justify-between items-center mt-16'>
                    <div>
                        <h3 className='text-4xl font-semibold mb-2'>Edit <span className='text-green-500'> Profile</span></h3>
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
                                    New Name
                                </p>
                                <input
                                    value={user.name}
                                    id="text"
                                    name="text"
                                    type="text"
                                    placeholder=''
                                    className="block w-full appearance-none outline-none px-4 py-4 placeholder-gray-400 shadow-sm sm:text-sm"
                                />
                            </div>
                            <div className="border-r border-l border-t border-b">
                                <p htmlFor="email" className="px-4 pt-4 block text-xs font-medium text-gray-400">
                                    New Email
                                </p>
                                <input
                                    value={user.email}
                                    id="text"
                                    name="text"
                                    type="text"
                                    placeholder=''
                                    className="block w-full appearance-none outline-none px-4 py-4 placeholder-gray-400 shadow-sm sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="mt-4 flex w-full justify-center border-transparent bg-green-500 py-4 px-4 text-sm font-medium text-white shadow-sm "
                            >
                                Edit
                            </button>
                            <p className='text-xs mt-2 text-[#686b78] font-normal'>By clicking on Edit, you can change <span className='text-black'>your profile data.</span></p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default EditProfile
