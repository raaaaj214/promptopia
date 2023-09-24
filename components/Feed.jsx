"use client";
import {useState, useEffect} from 'react'
import PromptCard from './PromptCard';
import "@styles/feed.css"
import { useSession } from 'next-auth/react';

const PromptCardList = ({data , handleTagClick}) => {
  return(
    <div className='pcardlist'>
        {
          data.map((post) => (
            <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            />
          ))
        }
    </div>
  )
}

const Feed = () => {
  const session = useSession();
  const [Fetch , setFetch] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);
    const [posts, setPosts] = useState([])
    useEffect(() => {
      console.log(session)
      const fetchPost = async() => {
        const res = await fetch("/api/prompt");
        const data = await res.json();
        setPosts(data)
      }
        if(session.status === "loading")
        {
          setTimeout(() => {
            setFetch(!Fetch)
          }, 1000);
        }
        
        if(session.status === "authenticated")
        {
          fetchPost()
        }
    },[Fetch])

    const filterPrompts = (searchtext) => {
      const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
      return posts.filter(
        (item) =>
          regex.test(item.creator.username) ||
          regex.test(item.tag) ||
          regex.test(item.prompt)
      );
    };

    const handleSearchChange = (e) => {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);
  
      // debounce method
      setSearchTimeout(
        setTimeout(() => {
          const searchResult = filterPrompts(e.target.value);
          setSearchedResults(searchResult);
        }, 500)
      );
    };

    const handleTagClick = (tagName) => {
      console.log(tagName)
      setSearchText(tagName);
  
      const searchResult = filterPrompts(tagName);
      setSearchedResults(searchResult);
    };
  return (
    <section className='feed'>
      <form className='feed-form'>
        <input type="text" 
        placeholder='Search for a tag or a username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='feed-form-input'
        />
      </form>

       {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed
