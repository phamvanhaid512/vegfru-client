import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { product } from '../../data/dummy';
import { ToastContainer, toast } from 'react-toastify';

const Products = ({ singleStore }) => {
    const [quantity, setQuantity] = useState(0)
    const [id, setId] = useState();
    const { cartItem, addToCart, addCurrentStore, currentStore, clearCart } = useContext(AuthContext);
    console.log(cartItem)

    const handleAdd = (curr) => {
        if(quantity == 0) return;
        if (currentStore?.storeName === singleStore.storeName || !currentStore) {
            const item = { ...curr, quantity: quantity, actualPrice : curr.price * quantity }
            addToCart(item);
            addCurrentStore(singleStore)
            toast.success("Item added to bag!", {
                hideProgressBar: true,
                autoClose: 1000,
                theme: "colored"
            })
            setQuantity(0);
            setId()
        } else {
            window.confirm("Want to replace your cart?")
            clearCart()
        }
    }

    // quantity counter
    const inCreament = (id) => {
        setId(id)
        setQuantity(quantity + 1);
    }
    const deCrement = (id) => {
        setId(id)
        if(quantity >= 0) setQuantity(quantity + 1);
    }

    return (
        <section class="text-gray-600 body-font mt-32 px-5">
            <ToastContainer />
            <div class="container mx-auto ">
                <div class="flex flex-wrap -m-4">
                    {
                        product.length > 0 ? (
                            product.map((curr, i) => {
                                return (
                                    <>
                                        <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                                            <a class="block relative h-46 rounded overflow-hidden">
                                                <img alt="ecommerce" class="object-cover object-center w-full h-full block" src={curr.image} />
                                            </a>
                                            <div class="mt-4">
                                                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">VEGETABLE</h3>
                                                <div className='flex items-center justify-between'>
                                                    <h2 class="text-gray-900 title-font text-lg font-medium">{curr.name}</h2>
                                                    <p class="mt-1">₹{curr.price}/ <span className='text-xs'>{curr.unitPerPrice + "" + curr.unit}</span></p>
                                                </div>
                                                <div className='flex items-center justify-between mt-4'>
                                                    <div className='flex items-center space-x-4'>
                                                        <svg onClick={() => deCrement(curr.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 px-1 cursor-pointer font-semibold bg-green-200 rounded-md">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                                        </svg>
                                                        <p className='text-sm'>{id === curr.id ? quantity : "0"}</p>
                                                        <svg onClick={() => inCreament(curr.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 px-1 cursor-pointer font-semibold bg-green-200 rounded-md">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                                        </svg>
                                                    </div>
                                                    <div onClick={() => handleAdd(curr)} className='flex items-center space-x-2 border px-5 py-1 bg-green-500 cursor-pointer text-white rounded-lg'>
                                                        Add
                                                    </div>
                                                </div>
                                                {/* <div className='flex justify-between'>
                                                    <p class="mt-1">₹{curr.price} <span className='text-xs'>{curr.unitPerPrice + "" + curr.unit}</span></p>
                                                    <div onClick={() => handleAdd(curr)} className='flex items-center space-x-2 border px-5 py-1 bg-green-500 cursor-pointer text-white rounded-lg'>
                                                        Add to Bag
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        ) : <p>No Products!</p>
                    }
                </div>
            </div>
        </section>
    )
}

export default Products
