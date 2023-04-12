import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import Image from "next/image";

const NavBar: NextPage = () => {
  
  const { isSignedIn, user } = useUser()
  const router = useRouter()

    return (
      <div className="text-1xl p-5">
        {!isSignedIn && (
          <div className="inline-flex justify-center items-center w-full mb-4">
            <SignInButton />
          </div>
        )}
        {(!!isSignedIn && !!user) && (
          <div className="inline-flex items-center">
            <Image src={user.profileImageUrl} width={45} height={45} className="rounded-full mr-3" alt='user avatar'/>
            <SignOutButton signOutCallback={router.reload}/>
          </div>
        )}
      </div>
    )
  }

export default NavBar