import React, { useContext, useState } from 'react'
import oip from "../../img/OIP.jpeg"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"
import PropagateLoader from "react-spinners/PropagateLoader"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';

const override = {
    display: "block",
    marginBottom: "12px",
};

const endpoint = "http://localhost:8000"

const Login = ({ handleClick }) => {
    const { setUser } = useContext(AuthContext);
    const [loader, setLoader] = useState(false);
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(`${endpoint}/api/user/login`,
                { phone, password },
                config);

            localStorage.setItem("jwt", JSON.stringify(data.token));
            // console.log(data.userLogin);
            setUser(data.userLogin);
            toast.success(data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoader(false);
            navigate("/dashboard");


        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoader(false);
        }

    }

    return (
        <div>
            <ToastContainer />
            <div className='flex flex-col space-y-14 md:pl-10 md:pr-48'>
                <div className='flex justify-between items-center mt-16'>
                    <div>
                        <h3 className='text-4xl font-semibold mb-2'>Login</h3>
                        <p>or <span onClick={() => handleClick('signup')} className='text-[#096F65] font-semibold cursor-pointer'>create an account</span></p>
                        <div class="border-b-2 border-black mt-4 w-8"></div>
                    </div>
                    <img src={oip} className='h-16 w-16' />
                </div>
                {/* Form */}
                <div className="mt-6">
                    <form action="#" method="POST" className="space-y-6">
                        <div className=''>

                            <div className="border-r border-l border-t border-b">
                                <p htmlFor="email" className="px-4 pt-4 block text-xs font-medium text-gray-400">
                                    Phone number
                                </p>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    id="text"
                                    name="text"
                                    type="text"
                                    placeholder=''
                                    className="block w-full appearance-none outline-none px-4 py-4 placeholder-gray-400 shadow-sm sm:text-sm"
                                />
                            </div>
                            <div className="border-r border-l border-b">
                                <p htmlFor="email" className="px-4 pt-4 block text-xs font-medium text-gray-400">
                                    Password
                                </p>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="text"
                                    name="password"
                                    type="password"
                                    placeholder=''
                                    className="block w-full appearance-none outline-none  px-4 py-4 placeholder-gray-400 shadow-sm sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleSubmitForm}
                                type="submit"
                                className="mt-4 flex w-full justify-center border-transparent bg-[#B33331] py-4 px-4 text-sm font-medium text-white shadow-sm "
                            >
                                {
                                    loader ? (
                                        <PropagateLoader color="#ffffff" cssOverride={override} size={13} />
                                    ) : "Login"
                                }
                            </button>
                            <p className='text-xs mt-2 text-[#686b78] font-normal'>By clicking on Login, I accept the <span className='text-black'>Terms & Conditions & Privacy Policy.</span></p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login
