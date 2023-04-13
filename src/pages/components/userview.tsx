import type { NextPage } from 'next'
// import { useRef } from 'react'
// import { useUser } from '@clerk/nextjs';
import { type RouterOutputs } from "~/utils/api";
import Image from "next/image";

// import Toast from './toast';

type UserProfile = RouterOutputs["users"]["getOneById"]

const UserView: NextPage< UserProfile > = ( user ) => {
    
    // const authUser = useUser()
    // const toastRef = useRef<{ publish: () => void }>()

    return (
        <>

        {/* <Toast forwardedRef={toastRef} title='Link copied to clipboard!' />  */}

        {!!user && (
            <div key={user.id} className="cursor-default mx-auto text-left w-11/12 p-5 rounded-xl mt-5 dark:text-white dark:bg-neutral-900">
                <div className="flex flex-col pl-4">
                <Image className="m-2 rounded-full w-24 h-24 bg-neutral-800 cursor-pointer" src={user.profileImageURL} height={50} width={50} alt="Profile Picture" />
                    <div className="flex flex-col p-2 mb-1 w-full">
                        <p className="text-2xl font-semibold leading-10">{user.firstName}{' '}{user.lastName}</p>
                        <p className="text-stone-500 text-xl hover:cursor-pointer">@{!user.userName ? 'username' : user.userName}</p>
                    </div> 
                </div> 
            </div>
        )}
    </>
    )
}

export default UserView