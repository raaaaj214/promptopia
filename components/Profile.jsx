import React from 'react'
import "@styles/profile.css"
import PromptCard from './PromptCard'

const Profile = ({name, desc , data , handleEdit , handleDelete}) => {
  return (
    <section className='profile'>
      <div className="profile-misc">
      <h1 className='profile-heading'>
        <span className='profile-heading-span'>{name} Profile</span>
        </h1>
        <p className='profile-desc'>{desc}</p>
        </div>
        <div className='pcardlist'>
        {
          data.map((post) => (
            <PromptCard 
            key={post._id}
            post={post}
            handleEdit={ () => {
              handleEdit && handleEdit(post)
            }}
            handleDelete={ () => {
              handleDelete && handleDelete(post)
            }}
            />
          ))
        }
    </div>
    </section>
  )
}

export default Profile
