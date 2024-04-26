import PostForm from '@/components/post/PostForm';
import React from 'react';

const CreatePostPage = () => {
  return (
    <div className='w-full'>
      <main className='container mx-auto px-20 h-full py-10'>
        {/* Create Post */}
        <div className='w-full'>
          <PostForm />
        </div>
      </main>
    </div>
  );
};

export default CreatePostPage;
