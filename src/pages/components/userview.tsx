import type { NextPage } from 'next'
import { type RouterOutputs } from "~/utils/api";
import Image from "next/image";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import { CalendarIcon } from '@radix-ui/react-icons';

type UserProfile = RouterOutputs["users"]["getOneById"]

const UserView: NextPage< UserProfile > = ( user ) => {

    return (
        <>
        {!!user && (
            <div key={user.id} className="cursor-default mx-auto text-left w-11/12 p-5 rounded-xl mt-5 dark:text-white dark:bg-neutral-900">
                <div className="flex flex-col pl-4">
                <Image className="m-2 rounded-full w-24 h-24 bg-neutral-800 cursor-pointer" src={user.profileImageURL} height={50} width={50} alt="Profile Picture" />
                    <div className="flex flex-col p-2 mb-1 w-full">
                        <p className="text-2xl font-semibold leading-10">{user.firstName}{' '}{user.lastName}</p>
                        <p className="text-stone-500 text-md">@{!user.userName ? 'username' : user.userName}</p>
                        <p className="inline-flex content-center items-center text-neutral-500 text-md leading-10 ">
                            <CalendarIcon className="w-5 h-5 mr-2" />
                            {`Joined ${dayjs(user.createdAt).fromNow()}`}
                        </p>
                    </div> 
                </div> 
            </div>
        )}
        </>
    )
}

export default UserView