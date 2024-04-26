'use client';
import DataList from '@/components/post/DataList';
import {PostServices} from '@/utils/apiConnect';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {BiPlus} from 'react-icons/bi';
import {toast} from 'react-toastify';

const PostPage = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch data from the API
      const res = await PostServices.getPosts();

      if (res.status === 200) {
        const data = res.data;
        if (data.status === 200 && !data.hasError) {
          // console.log(data.data.message);
          const posts = data.data.data;
          // console.log(posts);
          setPosts(posts);
          setLoading(false);
        } else {
          setLoading(false);
          throw new Error('API response is invalid');
        }
      } else {
        setLoading(false);
        throw new Error('Failed to fetch data');
      }
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
      setLoading(false);
      return {
        props: {
          posts: [], // Return an empty array or handle error state accordingly
        },
      };
    }
  };

  // Delete Post
  const [deleteLoading, setDeleteLoading] = useState(true);
  const handleDelete = async (id: any) => {
    setDeleteLoading(true);
    try {
      const response = await PostServices.deletePost(id);
      const res = response.data;
      if (!res.hasError) {
        toast.success(res.data.message);
        await fetchData();
      }
      setDeleteLoading(false);
    } catch (error) {
      console.log('error', error);
      setDeleteLoading(false);
    }
  };
  return (
    <div className='w-full'>
      <main className='container mx-auto px-20 h-full py-10'>
        <div className='flex w-full flex-col items-center justify-center h-full'>
          <div className='w-full flex flex-row justify-center items-start gap-10'>
            {/* Form */}

            <div className='w-full'>
              <div className='w-full pb-6'>
                <Link href={'/posts/create'} className='inline-flex gap-2'>
                  <button className='bg-blue-500 hover:bg-blue-800 text-white px-3 py-2 rounded-md hover-transition'>
                    Add Post
                  </button>
                  <BiPlus size={22} color='white' />
                </Link>
              </div>
              <DataList
                posts={posts}
                loading={loading}
                handleDelete={handleDelete}
                deleteLoading={deleteLoading}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostPage;
