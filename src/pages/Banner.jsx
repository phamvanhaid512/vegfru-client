import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import React, { useState, useEffect, useContext } from "react"
import img from "../img/7807053.jpg"
import logo from "../img/logo2.png";
import Login from '../components/auth/Login';
import Signup from "../components/auth/Signup"
import { Link } from "react-router-dom"
import { AuthContext } from '../context/AuthContext';
import { FaStore } from "react-icons/fa"
import { FcAbout } from "react-icons/fc"
import { BiHelpCircle } from "react-icons/bi"


const override = {
  display: "block",
  marginBottom: "12px",
};


export default function Banner() {
  const [size, setSize] = React.useState('lg')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [auth, setAuth] = useState();
  const { user, currentPlace, getLocation, loader } = useContext(AuthContext)

  const texts = ['Shop local, eat fresh.', 'Convenient,', 'Reliable and delicious.', 'Unexpected guests?'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    document.title = "VegFru | Online Vegetable & Fruit Marketplace"
    const intervalId = setInterval(() => {
      setCurrentTextIndex(currentTextIndex => (currentTextIndex + 1) % texts.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [texts.length]);

  const handleClick = (auth) => {
    setAuth(auth);
    onOpen()
  }

  return (
    <main className="flex flex-col">
      <div className="flex h-screen">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#ffffff] ">
          <div className="mx-auto w-full max-w-sm lg:w-96 ">
  
            <div>
              <div className="flex items-center">
                <img
                  className="h-24 md:h-16 w-auto"
                  src={logo}
                  alt="Your Company"
                />
                {/* <h4 className="font-semibold text-4xl">POS System</h4> */}
              </div>

              <h2 className=" mt-6 text-4xl font-semibold tracking-tight"> {texts[currentTextIndex]}</h2>
              <p className='text-gray-400 mt-2 font-normal'>Order vegetables & fruits from vendors near you.</p>
            </div>

            <div className="mt-8">
              <div>
                <div>
                  <div className="mt-1 grid grid-cols-2 gap-3">
                    <div>
                      <a
                        onClick={() => handleClick('login')}
                        href="#"
                        className="inline-flex w-full justify-center border border-gray-300 py-4 px-4 text-sm font-medium text-gray-500 shadow-sm"
                      >
                        Login
                      </a>
                    </div>

                    <div>
                      <a
                        onClick={() => handleClick('signup')}
                        href="#"
                        className="inline-flex w-full justify-center border bg-[#373737] py-4 px-4 text-sm font-medium text-white shadow-sm"
                      >
                        Sign up
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">

                    </label>
                    <div className="mt-1">
                      <input
                        value={currentPlace}
                        id="text"
                        name="text"
                        type="text"
                        placeholder=' Email your delivery location'
                        className="block w-full appearance-none border  px-3 py-4 placeholder-gray-400 shadow-sm sm:text-sm"
                      />
                    </div>
                  </div>

                  <Link>
                    <button
                      onClick={getLocation}
                      type="submit"
                      className="mt-4 flex w-full justify-center border-transparent bg-[#B33331] py-4 px-4 text-sm font-medium text-white shadow-sm "
                    >

                      Locate me
                    </button>
                  </Link>
                </form>
              </div>

            </div>
            <p className='text-center absolute bottom-10 text-gray-600 px-20'> Copyright &copy; VegFru 2023 | Design & <br /> Developed by <a className='font-medium underline' href='https://linktr.ee/rajamrit'>Amrit Raj</a>

            <div className='flex items-center justify-center mt-3 space-x-4'>
              <Link to="/dashboard"><FaStore size={25} className='cursor-pointer' /></Link>
              <Link to="/about"><FcAbout size={25} className='cursor-pointer' /></Link>
              <Link to="/help"><BiHelpCircle size={25} className='cursor-pointer' /></Link>
            </div>
            
            </p>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={img}
            alt=""
          />
        </div>
      </div>
      <Drawer onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            {auth === 'login' ? <Login handleClick={handleClick} /> : <Signup handleClick={handleClick} />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </main>
  )
}
