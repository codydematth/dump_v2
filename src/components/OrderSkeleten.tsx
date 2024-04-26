import React from 'react';
const OrderSkeleton = () => {
  return (
    <div className='animate-pulse px-4'>
      <div className='w-full grid grid-cols-1 py-3'>
        <div className='  rounded-md h-20 bg-gray-100'></div>
      </div>

      <div className='w-full grid grid-cols-1 py-3'>
        <div className='  rounded-md h-20  bg-gray-100'></div>
      </div>
      <div className='w-full grid grid-cols-1 py-3'>
        <div className='  rounded-md h-20  bg-gray-100'></div>
      </div>
      <div className='w-full grid grid-cols-1 py-3'>
        <div className='  rounded-md h-20  bg-gray-100'></div>
      </div>
    </div>
  );
};

export default OrderSkeleton;
