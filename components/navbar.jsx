'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {signIn,signOut,useSession, getProviders } from 'next-auth/react'
import "@styles/navbar.css"

const Navbar = () => {
  const {data : session} = useSession();
  const [providers , setProviders] = useState(null);
  const [toggleDropDown, settoggleDropDown] = useState(false);

  useEffect(() => {
    const callProviders = async () => {
      await getProviders().then((res) => setProviders(res));
    }

    callProviders();
  },[])
  return (
  <nav className="navbar">
    <Link href="/" className="link-1">
      <Image src="/assets/images/logo.svg" alt="promptopia logo"
      width={30}
      height={30}
      className="nav-logo "
      />
      <p className="logo-text">Promptopia</p>
    </Link>
      {/* desktop navigation */}
      <div className="navigation">
        {session?.user ? (
          <div className="black-btn-wrapper">
          <Link className="black-btn" href="/create-prompt">Create Post</Link>
          <button onClick={signOut} className="signout">Sign Out</button>
          <Link href="/profile">
            <Image src={session?.user.image}
            width={37}
            height={37}
            className="profile-pic"
            alt="profile picture"
            />
          </Link>
        </div>
        ) : (
          <>
          {
            providers && Object.values(providers).map((provider) => (
              <button type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="black-btn"
              >Sign In</button>
            ))
          }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="nav-mobile" >
        {
          session?.user ? (
            <div className="nav-m-wrapper">
              <Image src={session?.user.image}
            width={30}
            height={30}
            className="profile-pic"
            alt="profile picture"
            onClick={() => {settoggleDropDown(!toggleDropDown)}}
            />
            {
              toggleDropDown && (
                <div className="dropdown">
                  <Link href="/profile" className="dropdown-link" onClick={() => {
                    settoggleDropDown(false)
                  }}>
                    My Profile
                  </Link>
                  <Link href="/create-prompt" className="dropdown-link" onClick={() => {
                    settoggleDropDown(false)
                  }}>
                    Create Post
                  </Link>
                  <button type="button" onClick={() => {
                    settoggleDropDown(false);
                    signOut();
                  }}
                  className="black-btn"
                  >Sign Out</button>
                </div>
              )
            }
            </div>
          ) : (
            <>
          {
            providers && Object.values(providers).map((provider) => (
              <button type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="black-btn"
              >Sign In</button>
            ))
          }
          </>
          )
        }
      </div>
  </nav>
  )
}

export default Navbar
