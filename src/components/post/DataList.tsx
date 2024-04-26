'use client';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import {BiEditAlt} from 'react-icons/bi';
import OrderSkeleton from '../OrderSkeleten';
import Loader from '@/utils/loader';

interface IDataList {
  posts: any[];
  loading: boolean;
  deleteLoading: boolean;
  handleDelete: any;
}
const DataList = ({posts, loading, handleDelete, deleteLoading}: IDataList) => {
  const router = useRouter();
  const handleEditClick = (id: any) => {
    localStorage.setItem('#potI', JSON.stringify(id));
    router.push('/posts/update');
  };

  const [deletingItemId, setDeletingItemId] = useState(null);
  return (
    <div className='w-full'>
      {loading ? (
        <OrderSkeleton />
      ) : (
        <ul className='divide-y divide-gray-200'>
          {/* Mapping through the dataList */}
          {posts.length === 0 ? (
            <div>No Data found!</div>
          ) : (
            <div>
              {posts.map((item) => (
                <li
                  key={item.id}
                  className='flex items-center justify-between py-3 my-3 bg-gray-200 px-4 rounded-md hover:transition-hover hover:my-3'>
                  <div className='flex flex-row items-center gap-4'>
                    <div className='w-20 h-20 relative'>
                      <Image
                        layout='fill'
                        src={item.image}
                        alt='imgd'
                        loading='lazy'
                        className='h-full w-full rounded-full object-center'
                      />
                    </div>
                    <span className='text-gray-900 inline-flex'>
                      <span className='pl-4'> {item.post_title} |</span>

                      <span className='pl-4'> {item.post_sub_title} |</span>
                      <span className='pl-4'>
                        {item.post_description?.slice(0, 30)}{' '}
                      </span>
                    </span>
                  </div>
                  <div className='flex flex-row items-center gap-4'>
                    <span className='text-gray-900 inline-flex'>
                      {item.post_tags.map((item: any) => (
                        <div
                          key={item}
                          className='px-2 py-1 bg-blue-50 mx-1 rounded-md'>
                          <span className='text-gray-400 italic text-sm'>
                            {item}
                          </span>
                        </div>
                      ))}
                    </span>
                    <div className='flex items-center space-x-4'>
                      {/* Edit Icon */}
                      <button
                        onClick={() => handleEditClick(item.id)}
                        className='text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700'>
                        <BiEditAlt size={22} />
                      </button>
                      {/* Delete Icon */}
                      <button
                        onClick={() => {
                          handleDelete(item.id);
                          setDeletingItemId(item.id);
                        }}
                        className='text-red-500 hover:text-red-700 focus:outline-none focus:text-red-700'>
                        {deleteLoading && deletingItemId === item.id ? (
                          <div className='bg-blue-500 px-2 py-1 rounded-md'>
                            <Loader color='white' />
                          </div>
                        ) : (
                          <svg
                            className='h-5 w-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M6 18L18 6M6 6l12 12'
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          )}
          {/* End of data loop */}
        </ul>
      )}
    </div>
  );
};

export default DataList;
