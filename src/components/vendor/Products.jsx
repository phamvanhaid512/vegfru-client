import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
// import { product } from '../../data/dummy'; --> Dummy data
import { ToastContainer, toast } from 'react-toastify';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Image
} from '@chakra-ui/react'
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import HashLoader from 'react-spinners/HashLoader';

const Products = ({ singleStore }) => {
    const params = useParams()
    const storeId = params.storeId;
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(0)
    const [product, setProduct] = useState();
    const [id, setId] = useState();
    const { cartItem, addToCart, addCurrentStore, currentStore, clearCart } = useContext(AuthContext);
    const [loader, setLoader] = useState(false)


    const handleAdd = (curr) => {
        if (singleStore.status === "Closed") {
            toast.info("Store is Closed!", {
                theme: "colored",
                autoClose: 2000,
                hideProgressBar: true,
                position: "top-center"
            })
        } else {
            if (quantity == 0) return;
            if (currentStore?.storeName === singleStore.storeName || !currentStore) {
                const item = { ...curr, quantity: quantity, actualPrice: curr.productPrice * quantity }
                addToCart(item);
                addCurrentStore(singleStore)
                toast.success("Item added to bag!", {
                    hideProgressBar: true,
                    autoClose: 1000,
                    theme: "colored",
                    position: "top-left"
                })
                setQuantity(0);
                setId()
            } else {
                window.confirm("Want to replace your cart?")
                clearCart()
            }
        }
    }
    // quantity counter
    const inCreament = (id) => {
        setId(id)
        setQuantity(quantity + 1);
    }
    const deCrement = (id) => {
        setId(id)
        if (quantity > 0) setQuantity(quantity - 1);
    }


    // fetch products 
    const fetchProduct = async () => {
        setLoader(true)
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("jwt"))
                },
            };
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/vendor/product/get-product/${storeId}`, config);
            setProduct(data.getProduct)
        } catch (error) {
            console.log(error)
        }
        setLoader(false)
    }


    useEffect(() => {
        fetchProduct();
    }, [])

    return (
        <section class="text-gray-600 body-font md:mt-32 px-10">
            <ToastContainer />
            {/* Modal */}
            <Modal size="xl" isOpen={singleStore?.status === "Active" ? false : true}>
                <ModalOverlay />
                <ModalContent>
                    <Alert
                        status='warning'
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='300px'
                    >
                        <AlertIcon boxSize='40px' mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize='lg'>
                            Sorry can't place your order
                        </AlertTitle>
                        <AlertDescription maxWidth='sm'>
                            <div>
                                The store is closed right now, try buying from another stores.
                            </div>
                            <div onClick={() => navigate("/dashboard")} className='cursor-pointer flex bg-black text-sm text-white w-24 space-x-1 items-center px-3 py-2 rounded-md mx-auto mt-3'>
                                <AiOutlineArrowLeft /> <span>Go Back</span>
                            </div>
                        </AlertDescription>
                    </Alert>
                </ModalContent>
            </Modal>
            {/* Modal */}
            {loader ? <HashLoader color="#36d7b7" /> : (
                <>
                    <div class="container mx-auto md:overflow-y-scroll md:h-screen md:scrollbar-hide">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:gap-4 ">
                            {
                                product?.length > 0 ? (
                                    product?.map((curr, i) => {
                                        return (
                                            <>
                                                <div key={curr._id} className='md:p-4 w-full h-[230px] flex flex-col justify-between'>
                                                    <div className='flex justify-center items-center'>
                                                        <Image src={curr.productImage} className='w-32 h-32 rounded-full border-4 border-gray-300 object-contain' alt='Dan Abramov' />
                                                    </div>
                                                    <div className='flex justify-between'>
                                                        <h2 class="text-gray-900 title-font text-lg font-medium">{curr.productName}</h2>
                                                        <p class="mt-1">₹{curr.productPrice}/ <span className='text-xs'>{curr.productBaseUnit + "" + curr.productUnit}</span></p>
                                                    </div>
                                                    <div className='flex justify-between'>
                                                        <div className='flex items-center space-x-4'>
                                                            <svg onClick={() => deCrement(curr._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 px-1 cursor-pointer font-semibold bg-green-200 rounded-lg ">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                                            </svg>
                                                            <p className='text-sm'>{id === curr._id ? quantity : "0"}</p>
                                                            <svg onClick={() => inCreament(curr._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 px-1 cursor-pointer font-semibold bg-green-200  rounded-lg">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                                            </svg>
                                                        </div>
                                                        <div onClick={() => handleAdd(curr)} className='flex items-center space-x-2 border px-5 py-1 bg-green-500 cursor-pointer text-white border-none rounded-lg'>
                                                            Add
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                ) : (
                                    <div className='w-96'
                                    >
                                        <h2 className='text-xl'> Sorry can't place your order!</h2>
                                        <p className='mt-2 text-sm'> This store doesn't have any products, try buying another from store!</p>
                                        <div onClick={() => navigate("/dashboard")} className='cursor-pointer flex items-center space-x-2 w-28 mt-2 bg-green-100 border-green-100 text-green-500 border p-3'>
                                            <AiOutlineArrowLeft /> <span>Go Back</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </>
            )}
        </section>
    )
}

export default Products
