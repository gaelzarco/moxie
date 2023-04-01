import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link"
import { SignInButton,useUser } from '@clerk/nextjs'
// import { SignOutButton } from '@clerk/nextjs'
import { FiMoreHorizontal } from 'react-icons/fi'
// import { FiLogOut } from "react-icons/fi";
import { SiTwitter } from "react-icons/si";
import { AiOutlineHome } from "react-icons/ai";

const NavBar: NextPage = () => {  
  const { isSignedIn, user } = useUser()

    return (
      <nav className="flex flex-col col-span-1 h-screen">
        <div className="flex flex-col w-11/12 mx-auto h-full justify-between">
          <div className="mt-1 flex flex-col h-auto">
          <Link href='https://github.com/gaelzarco/moxie'>
            <div className="rounded-full p-5 hover:bg-neutral-100 w-min">
              <SiTwitter
              className="text-black hover:text-stone-800"
              size={30}
              />
            </div>
          </Link>
          <Link href='/'>
            <div className="inline-flex mt-1 items-center rounded-full p-5 hover:bg-neutral-100">
            <AiOutlineHome
              className="text-black hover:text-stone-800"
              size={30} 
            />
            <h3 className="ml-10 text-xl font-bold">Home</h3>
            </div>
          </Link>
          </div>

            <div className="text-1xl w-full p-5">
              {!isSignedIn && <SignInButton />}
              {!!isSignedIn && (
                <div className="rounded-xl">
                  {!!user && (
                      <div className="inline-flex justify-between items-center w-full">
                          <div className="inline-flex items-center">
                            <Image src={user.profileImageUrl} width={50} height={50} className="rounded-full" alt='user avatar'/>
                            <div className="flex flex-col ml-2">
                                <h2 className="font-medium">Gael Zarco</h2>
                                <p className="text-stone-500 text-md">@{user.username}</p>
                            </div>
                          </div>
                          <FiMoreHorizontal className="text-stone-500 hover:cursor-pointer" size={22}/>
                      </div>
                  )}
                </div>
              )}
            </div>
          </div>
      </nav>
    )
  }

export default NavBar