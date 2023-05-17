import React from 'react'
import vendor from '../../img/vegetable-vendor-1236840.jpg'
import { Box, keyframes, Tooltip, Card, CardHeader, CardBody, CardFooter, Flex, Image, Button, Avatar } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const MapPopup = ({ store }) => {
  const activeColor = 'green.500';
  const inactiveColor = 'gray.400';
  const ringScaleMin = 0.33;
  const ringScaleMax = 0.66;

  const pulseRing = keyframes`
	0% {
    transform: scale(${ringScaleMin});
  }
	30% {
		transform: scale(${ringScaleMax});
	},
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;

  const pulseDot = keyframes`
	0% {
    transform: scale(0.9);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(0.9);
  }
	`;

  const navigate = useNavigate();


  return (
    <div onClick={() => navigate(`/vendor/${store._id}`)}>
      <div className='flex items-center justify-start space-x-5 mb-5 cursor-pointer'  >
        <div className='flex flex-col items-start'>
          <h2 className='flex items-center font-semibold text-[18px] mt-3 mb-2'>{store.storeName} <Tooltip label={`Status: Active`} textTransform="capitalize">
            <Box
              as="div"
              h="12px"
              w="12px"
              ml="0.5em"
              position="relative"
              bgColor={activeColor}
              borderRadius="50%"
              _before={{
                content: "''",
                position: 'relative',
                display: 'block',
                width: '300%',
                height: '300%',
                boxSizing: 'border-box',
                marginLeft: '-100%',
                marginTop: '-100%',
                borderRadius: '50%',
                bgColor: activeColor,
                animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
              }}
              _after={{
                animation: `2.25s ${pulseDot} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
              }}
            />
          </Tooltip> </h2>
          <small>{store.storeAddress}</small>

        </div>
      </div>

      <Image
        objectFit='cover'
        src={store.storeImage}
        alt='Chakra UI'
      />
      <div className='flex justify-between items-center mt-3'>
        <p className='text-green-600 font-bold'>{store.storeType === "both" ? "VEGETABLES & FRUITS" : store.storeType.toUpperCase()}</p>
        <p className='flex items-center text-xs'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
          <span><span className='font-semibold'>3.2KM </span> far from you.</span></p>
      </div>
      <div className='flex items-center justify-around mt-3'
      >
        <div className='flex items-center cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>

          <span className='text-red-500 font-bold' >{store.like.length}</span>
        </div>
        <div className='flex items-center cursor-pointer' >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-indigo-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          <span className='text-indigo-500 font-bold'>{store.comments.length}</span>
        </div>
        <div className='flex items-center cursor-pointer'>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-700 font-bold w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          <span className='text-green-700 font-bold'>4.3</span>
        </div>
      </div>
    </div>
  )
}

export default MapPopup
{/* <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' /> */ }