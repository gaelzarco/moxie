import type { NextPage } from 'next'
import { type RouterOutputs } from "~/utils/api";
import Image from "next/image";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import { CalendarIcon } from '@radix-ui/react-icons';

type UserProfile = {
    filteredUser: RouterOutputs["users"]["getOneById"]["filteredUser"]
    postCount: number
    replyCount: number
}

const UserView: NextPage< UserProfile > = ({ filteredUser, postCount, replyCount }) => {

    return (
        <>
        {!!filteredUser && (
            <div key={filteredUser.id} className="cursor-default mx-auto text-left w-11/12 p-5 rounded-xl mt-5 dark:text-white dark:bg-neutral-900">
                <div className="flex flex-col pl-5 mt-5 mb-5">
                    <Image className="m-2 rounded-full w-24 h-24 bg-neutral-800 cursor-pointer" src={filteredUser.profileImageURL} height={50} width={50} alt="Profile Picture" />
                    <div className="flex flex-col p-2 mb-1 w-full">
                        <p className="text-2xl font-semibold leading-10">{filteredUser.firstName}{' '}{filteredUser.lastName}</p>
                        <p className="text-stone-500 text-md">@{!filteredUser.userName ? 'username' : filteredUser.userName}</p>
                        <p className="inline-flex content-center items-center text-neutral-500 text-sm leading-10">
                            <CalendarIcon className="w-5 h-5 mr-2" />
                            {`Joined ${dayjs(filteredUser.createdAt).fromNow()}`}
                        </p>
                        <p className="flex flex-row content-center items-center text-neutral-500 text-sm leading-10">
                            {postCount} Posts
                            <p className='ml-2'>
                            ·
                            </p>
                            <p className='ml-2'>
                            {replyCount} Replies
                            </p>
                        </p>
                    </div> 
                </div> 
            </div>
        )}
        </>
    )
}

export default UserView