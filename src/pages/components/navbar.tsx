import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SignInButton, SignOutButton, useUser, SignedOut } from '@clerk/nextjs'
import Image from "next/image";
import Link from "next/link"

import { FiMoreHorizontal, FiUser } from 'react-icons/fi'
// import { FiLogOut } from "react-icons/fi";
import { SiTwitter } from "react-icons/si";
import { AiOutlineHome } from "react-icons/ai";

const NavBar: NextPage = () => {
  
  const { isSignedIn, user } = useUser()
  const router = useRouter()

    return (
      <nav className="dark:bg-neutral-900 h-full">
        <div className="flex flex-col h-full justify-between">
          <div className="mt-1 flex flex-col h-auto">
          <Link href='https://github.com/gaelzarco/moxie'>
            <div className="rounded-full p-5 dark:hover:bg-neutral-800 w-min">
              <SiTwitter
              className="dark:text-white"
              size={30}
              />
            </div>
          </Link>
          <Link href='/'>
            <div className="inline-flex mt-2 items-center rounded-full p-5 dark:hover:bg-neutral-800">
            <AiOutlineHome
              className="dark:text-white"
              size={30} 
            />
            <h3 className="ml-10 text-xl font-bold">Home</h3>
            </div>
          </Link>
          <Link href='/profile'>
            <div className="inline-flex mt-2 items-center rounded-full p-5 dark:hover:bg-neutral-800">
            <FiUser
              className="dark:text-white"
              size={30} 
            />
            <h3 className="ml-10 text-xl font-bold">Profile</h3>
            </div>
          </Link>
          </div>

            <div className="text-1xl p-5">
              {!isSignedIn && (
                <div className="inline-flex justify-center items-center w-full mb-4">
                  <SignInButton />
                </div>
              )}
              {(!!isSignedIn && !!user) && (
                <div className="rounded-xl">
                  <div className="inline-flex justify-between items-center w-full">
                    <div className="inline-flex items-center">
                      <Image src={user.profileImageUrl} width={50} height={50} className="rounded-full" alt='user avatar'/>
                      <div className="flex flex-col ml-2">
                          <h2 className="font-medium">Gael Zarco</h2>
                          <p className="text-stone-500 text-md">@{user.username}</p>
                      </div>
                    </div>
                    <SignOutButton signOutCallback={router.reload}>
                      <FiMoreHorizontal
                        className="dark:text-white hover:cursor-pointer"
                        size={22}
                      />
                    </SignOutButton>
                  </div>
                </div>
              )}
            </div>
          </div>
      </nav>
    )
  }

export default NavBar