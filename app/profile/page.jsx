"use client";
import {useState , useEffect} from 'react'
import { useSession } from 'next-auth/react';
import "@styles/profile.css"
import Profile from '@components/Profile';
import { useRouter } from 'next/navigation';


const MyProfile = () => {
  const session = useSession();
  const [posts, setPosts] = useState([])
  const router = useRouter()


  useEffect(() => {
    const fetchPost = async() => {
      console.log("me" , session.data.user)
      const res = await fetch(`/api/users/${session.data?.user.id}/posts`);
      console.log(session?.data.user.id)
      const data = await res.json();
      setPosts(data)
      console.log("data" , data)
    }
    if(session.data?.user.id)
      fetchPost()
  },[])

    const handleEdit = (post) => {
      console.log("id" , post)
      router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async(post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt ?")

        if(hasConfirmed)
        {
          try {
            await fetch(`/api/prompt/${post._id.toString()}` , {
              method : 'DELETE'
            })

            const filteredPosts = posts.filter( p => p._id !== post._id)

            setPosts(filteredPosts )
          } catch (error) {
            console.log(error)
          }
        }
    }


  return (
    <div>
      {/* {console.log(posts)} */}
      <Profile
      name="My"
      desc ="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      />
    </div>
  )
}

export default MyProfile
