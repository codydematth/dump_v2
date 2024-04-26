import EditPost from '@/components/post/EditPost';

const UpdatePostPage = () => {
  return (
    <div className='w-full'>
      <main className='container mx-auto px-20 h-full py-10'>
        {/* Create Post */}
        <div className='w-full'>
          <EditPost />
        </div>
      </main>
    </div>
  );
};

export default UpdatePostPage;
