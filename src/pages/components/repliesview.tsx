import type { NextPage } from 'next'
import { useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import CreateLike from "./createlike";
import UserProfileHoverCard from "./hovercard";
import PostOptionsDropDown from './dropdownmenus';
import Toast from './toast';
import { Share1Icon } from '@radix-ui/react-icons';
import Header from './header';

type RepliesWithUsersAndImages = RouterOutputs["replies"]["getAllByPostId"]

const RepliesView: NextPage< RepliesWithUsersAndImages > = ( replies ) => {

    const authUser = useUser()
    const toastRef = useRef<{ publish: () => void }>()
    
    return (
        <>

        <Toast forwardedRef={toastRef} title='Link copied to clipboard!' /> 

        <Header noNav>
            <h2 className="ml-5 text-2xl font-bold">
                Replies
            </h2>
        </Header>
        
        {!!replies && (Object.values(replies).map(({ reply, user }) => {
            return (
                <div key={reply.id} className="cursor-default mx-auto text-left w-11/12 p-5 rounded-xl mt-5 dark:text-white dark:bg-neutral-900">
                    <div className="flex leading-none">
                        <UserProfileHoverCard {...user}/>
                        <div className="mb-1 w-full">
                            <div className="inline-flex mb-6 w-full items-center justify-between">
                                <Link href={`/user/${user.id}`} className="w-full hover:cursor-pointer">
                                    <div className="inline-flex content-center justify-center items-center">
                                        <p className="pl-2 font-semibold">{user.firstName}</p>
                                        <p className="text-neutral-500 text-md pl-2">@{!user.userName ? 'username' : user.userName}</p>
                                        <p className="text-neutral-500 text-sm pl-1">
                                            {` · ${dayjs(reply.createdAt).fromNow()}`}
                                        </p>
                                    </div>
                                </Link>
                                <PostOptionsDropDown postId={reply.postId} replyId={reply.id} postType='REPLY' deleteType='REPLY'/>
                            </div>

                            <h4 className="pl-2 mb-6 leading-5">{reply.body}</h4>
                            {reply.link && (
                                <Image className="h-auto w-full min-w-full mb-4 rounded-3xl" src={reply.link} height={300} width={500} alt="Attached Media for Post" />
                            )}

                            <div className="mt-2 inline-flex ml-2">
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
                                <Share1Icon 
                                    className="hover:cursor-pointer dark:text-white ml-16 h-5 w-5 align-right" 
                                    onClick={() => {
                                        navigator.clipboard.writeText(`https://moxie-x.vercel.app/post/${reply.postId}`)
                                        .then(toastRef.current?.publish)
                                        .catch((err) => console.log(err))
                                    }}    
                                />
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