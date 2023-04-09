import type { NextPage } from 'next'
import { useUser } from '@clerk/nextjs'
import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";

import CreateLike from "./createlike";
import UserProfileHoverCard from "./hovercard";
import { FiShare, FiMoreHorizontal } from 'react-icons/fi'

type RepliesWithUsersAndImages = RouterOutputs["replies"]["getAllByPostId"]

const RepliesView: NextPage<RepliesWithUsersAndImages> = ( data ) => {

    const authUser = useUser()
    
    return (
        <>
        {!!data && (Object.values(data).map(({ reply, user }) => {
            return (
                <div key={reply.id} className="m-auto text-left border-b dark:border-stone-700 w-full min-w-full p-4 cursor-default">
                    <div className="flex leading-none">
                        <UserProfileHoverCard
                            url={user.profileImageURL}
                            firstName={user.firstName}
                            userName={user.userName}
                            userBio='This is my profile page'
                        />
                        <div className="pl-2 mb-1 w-full">
                            <div className="inline-flex mb-6 w-full justify-between">
                            <div className="inline-flex items-center">
                                <p className="pl-2 font-medium">{user.firstName}</p>
                                <p className="text-stone-500 text-md hover:cursor-pointer pl-2">@{user.userName === null ? 'username' : user.userName}</p>
                            </div>
                            <FiMoreHorizontal className="dark:text-white hover:cursor-pointer" size={22}/>
                            </div>
                            <h4 className="pl-2 mb-6">{reply.body}</h4>
                            {reply.link && (
                                <Image className="h-auto w-full min-w-full mb-4 rounded-3xl" src={reply.link} height={300} width={500} alt="Attached Media for Post" />
                            )}
                            <div className="mt-1 inline-flex ml-2">
                                <div className="inline-flex w-auto justify-between">
                                    <CreateLike 
                                        postId={reply.postId} 
                                        replyId={reply.id} 
                                        postType="REPLY" 
                                        likeType='REPLY' 
                                        liked={reply.likes.find((like) => like.userId === authUser.user?.id) ? true : false}
                                        likesArrLength={reply.likes.length}
                                    />
                                </div>
                                <FiShare className="hover:cursor-pointer dark:text-white ml-20 align-right" size={20}/>
                            </div>
                        </div> 
                    </div> 
                </div>
              )
          }))}
        </>
    )
}

export default RepliesView;