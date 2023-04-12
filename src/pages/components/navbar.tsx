import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import Image from "next/image";

import { PersonIcon } from "@radix-ui/react-icons";

const NavBar: NextPage = () => {
  
  const { isSignedIn, user } = useUser()
  const router = useRouter()

    return (
      <div className="inline-flex p-5 pr-6 justify-between">
          
        {!isSignedIn && (
          <div className="inline-flex items-center">
            <SignInButton>
              <PersonIcon className="rounded-full mr-0 hover:cursor-pointer w-12 h-12 bg-neutral-800 p-3"/>
            </SignInButton>
          </div>
        )}
        {(!!isSignedIn && !!user) && (
          <div className="inline-flex items-center">
            <SignOutButton signOutCallback={router.reload}>
              <Image src={user.profileImageUrl} width={45} height={45} className="rounded-full mr-0 hover:cursor-pointer bg-neutral-800" alt='user avatar' />
            </SignOutButton>
          </div>
        )}

      </div>
    )
  }

export default NavBar