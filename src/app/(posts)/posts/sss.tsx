import Loader from '@/utils/loader';
import React from 'react';

const loading = () => {
  return (
    <div className='h-screen w-full grid place-items-center bg-blue-950 '>
      <div className='animate-bounce'>
        <Loader color='white' />
      </div>
    </div>
  );
};

export default loading;
