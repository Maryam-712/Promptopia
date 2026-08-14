'use client';

import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@/components/Profile';

const MyProfile = () => {
  const router = useRouter();
  const {data: session, status} = useSession();
  const [posts, setPosts] = useState([]);  

   useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${session?.user.id}/posts`);
      const data = await response.json();
      console.log("Fetched profile posts:", data); // ADD THIS
      setPosts(data);
    };
    console.log("Status:", status, "Session:", session); 
    if (status === 'authenticated' && session?.user?.id) fetchPosts();
  }, [status, session])

  const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if(hasConfirmed){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });

        const filteredPosts = posts.filter((p)=> p._id !== post._id)
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile
    name = 'My'
    desc = 'welcome to your personalized profile page '
    data= {posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />

  )
}

export default MyProfile