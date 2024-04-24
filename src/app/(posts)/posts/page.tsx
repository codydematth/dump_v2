import PostForm from '@/components/post/PostForm';
import React from 'react';

const PostPage = () => {
  return (
    <div className='w-full h-screen'>
      <main className='container mx-auto px-20 h-full py-10'>
        <div className='flex w-full flex-col items-center justify-center h-full'>
          <div className='w-[60%] '>
            {/* Form */}
            <PostForm />
            <div className=' '>Post List</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostPage;
