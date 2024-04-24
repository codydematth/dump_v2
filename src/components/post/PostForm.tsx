'use client';
import {BASE_URL} from '@/uitls/helper';
import React, {ChangeEvent, FormEvent, useState} from 'react';

type PostFormData = {
  post_title: string;
  post_sub_title: string;
  post_description: string;
  live_url: string;
  code_url: string;
  image: File | null;
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
const PostForm = () => {
  const [formData, setFormData] = useState<PostFormData>(initialFormData);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestOptions: any = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    };

    try {
      const response = await fetch(`${BASE_URL}/posts/create`, requestOptions);
      // Handle response as needed
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='bg-gray-200 border rounded-md p-4'>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-8'>
        <label className='block mb-2'>Post Title</label>
        <input
          type='text'
          name='post_title'
          value={formData.post_title}
          onChange={handleChange}
          className='w-full mb-4 p-2 border rounded focus:outline-none'
        />

        <label className='block mb-2'>Post Sub Title *</label>
        <input
          type='text'
          name='post_sub_title'
          value={formData.post_sub_title}
          onChange={handleChange}
          className='w-full mb-4 p-2 border rounded focus:outline-none'
        />

        <label className='block mb-2'>Post Description *</label>
        <textarea
          name='post_description'
          value={formData.post_description}
          onChange={handleChange}
          className='w-full mb-4 p-2 border rounded focus:outline-none'></textarea>

        <label className='block mb-2'>Live URL</label>
        <input
          type='text'
          name='live_url'
          value={formData.live_url}
          onChange={handleChange}
          className='w-full mb-4 p-2 border rounded focus:outline-none'
        />

        <label className='block mb-2'>Code URL</label>
        <input
          type='text'
          name='code_url'
          value={formData.code_url}
          onChange={handleChange}
          className='w-full mb-4 p-2 border rounded focus:outline-none'
        />

        <label className='block mb-2'>Image *</label>
        <input
          type='file'
          onChange={handleFileChange}
          className='w-full mb-4 p-2 border rounded focus:outline-none'
        />

        <label className='block mb-2'>Post Tags</label>
        <input
          type='text'
          name='post_tags'
          value={formData.post_tags.join(',')}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              post_tags: e.target.value.split(','),
            }))
          }
          className='w-full mb-4 p-2 border rounded focus:outline-none'
        />

        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
