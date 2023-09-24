"use client";
import {useState } from 'react'
import "@styles/promptCard.css"
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname , useRouter } from 'next/navigation';

const PromptCard = ({post , handleTagClick, handleEdit , handleDelete}) => {
    const router = useRouter();
    const [copied, setCopied] = useState("")
    const session = useSession();
    const pathName = usePathname(); 

    const handleCopy = () => {
      setCopied(post.prompt)
      navigator.clipboard.writeText(post.prompt);
      setTimeout(() => {
        setCopied(" ")
      }, 3000);
    }
    
    const handleProfileView = () => {
      console.log(post.creator._id)
        router.push(`/profile/${post.creator._id}`)
    }

  return (
    <div className='prompt-card'>
      <div className="prompt-wrapper">
        <div className='prompt-user' onClick={handleProfileView}>
          <Image
            src={post?.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='prompt-user-img '
          />

          <div className="prompt-user-info">
            <h3>{post.creator.username}</h3>
            <p>{post.creator.email}</p>
          </div>
        </div>
         <div className="prompt-copy" onClick={handleCopy}>
          <Image
          src={copied === post.prompt ? '/assets/icons/tick.svg' : 'assets/icons/copy.svg'}
          width={12}
          height={12}
          />
         </div>
      </div>

      <p className='prompt-content'>{post.prompt}</p>
      <p className='prompt-tag'
      onClick={() => handleTagClick && handleTagClick(post.tag)}
      >{post.tag}</p>

      {
        session.data?.user.id === post.creator._id &&
        pathName === '/profile' && (
          <div className='tools'>
            <p
            className='tools-edit'
            onClick={handleEdit}
            >Edit</p>
            <p
            className='tools-delete'
            onClick={handleDelete}
            >Delete</p>
          </div>
        )
      }
    </div>
  )
}

export default PromptCard
