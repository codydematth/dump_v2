/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import {PostServices} from '@/utils/apiConnect';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import OrderSkeleton from '../OrderSkeleten';
import Loader from '@/utils/loader';

type PostFormData = {
  post_title: string;
  post_sub_title: string;
  post_description: string;
  live_url: string;
  code_url: string;
  image?: File | null;
  post_tags: string[];
};
type IPost = {
  post_title: string;
  post_sub_title: string;
  post_description: string;
  live_url: string;
  code_url: string;
  image: string;
  post_tags: string[];
};
const initialFormData: PostFormData = {
  post_title: '',
  post_sub_title: '',
  post_description: '',
  live_url: '',
  code_url: '',
  image: null,
  post_tags: [],
};

const EditPost = () => {
  const [formData, setFormData] = useState<PostFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const id = JSON.parse(localStorage.getItem('#potI') || '');
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }));
  };

  const handleSubmit = async () => {
    console.log('Page');
    setLoading(true);

    const data = new FormData();
    data.append('post_title', formData.post_title);
    data.append('post_sub_title', formData.post_sub_title);
    data.append('post_description', formData.post_description);
    data.append('live_url', formData.live_url);
    data.append('code_url', formData.code_url);
    if (formData.image) {
      data.append('image', formData.image);
    }
    formData.post_tags.forEach((tag) => data.append('post_tags', tag));

    try {
      if (!formData.post_title || !formData.post_sub_title || !formData.image) {
        toast.error('Please fill the required inputs');
        setLoading(false);
        return;
      }

      const response = await PostServices.updatePost(id, data);
      // Handle response as needed
      console.log('response', response);
      const res = response.data;
      if (!res.hasError) {
        toast.success(res.data.message);
        router.push('../posts');
        setFormData({
          code_url: '',
          image: null,
          live_url: '',
          post_description: '',
          post_sub_title: '',
          post_tags: [],
          post_title: '',
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  // get Post by Id
  const [imageUrl, setImageUrl] = useState<any>();
  const [fetchLoading, setFetchLoading] = useState(false);

  //   console.log('postId', id);
  // Fetch Details
  useEffect(() => {
    const fetchData = async () => {
      setFetchLoading(true);
      try {
        // Fetch data from the API
        const res = await PostServices.postDetails(id);

        if (res.status === 200) {
          const data = res.data;
          if (data.status === 200 && !data.hasError) {
            // console.log(data.data.message);
            const post: IPost = data.data.data;
            // console.log(posts);
            setFormData({
              code_url: post.code_url,
              live_url: post.live_url,
              post_description: post.post_description,
              post_sub_title: post.post_sub_title,
              post_tags: post.post_tags,
              post_title: post.post_title,
            });
            setImageUrl(post.image);
            setFetchLoading(false);
          } else {
            throw new Error('API response is invalid');
          }
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
        setFetchLoading(false);
        return {
          props: {
            posts: [], // Return an empty array or handle error state accordingly
          },
        };
      }
    };
    fetchData();
  }, []);
  return (
    <div className='bg-gray-200 border rounded-md p-4'>
      {fetchLoading ? (
        <OrderSkeleton />
      ) : (
        <div className='max-w-md mx-auto mt-8'>
          <label className='block mb-2'>Post Title</label>
          <input
            type='text'
            name='post_title'
            value={formData.post_title || ''}
            onChange={handleChange}
            className='w-full mb-4 p-2 border rounded focus:outline-none'
          />

          <label className='block mb-2'>Post Sub Title *</label>
          <input
            type='text'
            name='post_sub_title'
            value={formData.post_sub_title || ''}
            onChange={handleChange}
            className='w-full mb-4 p-2 border rounded focus:outline-none'
          />

          <label className='block mb-2'>Post Description *</label>
          <textarea
            name='post_description'
            value={formData.post_description || ''}
            onChange={handleChange}
            className='w-full mb-4 p-2 border rounded focus:outline-none'></textarea>

          <label className='block mb-2'>Live URL</label>
          <input
            type='text'
            name='live_url'
            value={formData.live_url || ''}
            onChange={handleChange}
            className='w-full mb-4 p-2 border rounded focus:outline-none'
          />

          <label className='block mb-2'>Code URL</label>
          <input
            type='text'
            name='code_url'
            value={formData.code_url || ''}
            onChange={handleChange}
            className='w-full mb-4 p-2 border rounded focus:outline-none'
          />

          <label className='block mb-2'>Image *</label>
          <div className='w-20 h-20 relative'>
            {imageUrl && (
              <Image
                layout='fill'
                src={imageUrl}
                alt='updatedImage'
                loading='lazy'
                objectFit='center'
                className='h-full w-full rounded-full object-center'
              />
            )}
          </div>
          <input
            type='file'
            onChange={handleFileChange}
            className='w-full mb-4 p-2 border rounded focus:outline-none'
          />

          <label className='block mb-2'>Post Tags</label>
          <input
            type='text'
            name='post_tags'
            value={formData.post_tags.map((item) => item).join(',') || ''}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                post_tags: e.target.value.split(','),
              }))
            }
            className='w-full mb-4 p-2 border rounded focus:outline-none'
          />

          <button
            onClick={handleSubmit}
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>
            {loading ? <Loader color={'#fff'} /> : 'Update'}
          </button>
        </div>
      )}
    </div>
  );
};

export default EditPost;
