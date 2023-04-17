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
import { Share1Icon, PaperPlaneIcon } from '@radix-ui/react-icons';
import Header from './header';

type Replies = {
    replies: RouterOutputs["replies"]["getAllByPostId"] | RouterOutputs["replies"]["getAllByUserId"]
    userView?: boolean
}

const RepliesView: NextPage< Replies > = ({ replies, userView }) => {

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

        {Object.keys(replies).length === 0 && (
            <div className="cursor-default text-center flex flex-col items-center content-center justify-center w-11/12 p-5 rounded-xl mt-5 mb-20 text-neutral-500">
                <h1>Nothing to see here</h1>
            </div>
        )}
        
        {!!replies && (Object.values(replies).map(({ reply, user, postUser }) => {
            return (
                <div key={reply.id} className="cursor-default mx-auto text-left w-11/12 p-5 rounded-xl mt-5 mb-4 dark:text-white dark:bg-neutral-900">
                    <div className="text-neutral-500 text-sm mb-6 ml-1">
                        <Link href={`/post/${reply.postId}`} className='inline-flex content-center items-center justify-center'>
                            <PaperPlaneIcon className="w-3 h-3 mr-5 mt-1" />
                            <p>{"In reply to " + `${postUser?.firstName as string}` + "'s Post" }</p>
                        </Link>
                    </div>
                    <div className="flex leading-none">
                        <UserProfileHoverCard {...user}/>
                        <div className="mb-1 w-full">
                            <div className="inline-flex mb-6 w-full items-center justify-between">
                                    <div className="inline-flex content-center justify-center items-center">
                                        <Link href={`/user/${user.id}`} className="hover:cursor-pointer inline-flex justify-center content-center items-center">
                                            <p className="font-semibold pl-2">{user.firstName}</p>
                                            <p className="text-neutral-500 text-md max-sm:text-sm pl-2">@{!user.userName ? 'username' : user.userName}</p>
                                        </Link>
                                        <p className="text-neutral-500 text-sm max-sm:text-xs pl-1">
                                            {` · ${dayjs(reply.createdAt).fromNow()}`}
                                        </p>
                                    </div>
                                {authUser.user?.id === user.id && userView && (
                                    <PostOptionsDropDown userId={user.id} replyId={reply.id} postType='REPLY' deleteType='PROFILE'/>
                                )}
                                {authUser.user?.id === user.id && !userView && (
                                    <PostOptionsDropDown postId={reply.postId} replyId={reply.id} postType='REPLY' deleteType='REPLY'/>
                                )}
                            </div>

                            <h4 className="pl-2 mb-6 leading-5">{reply.body}</h4>
                            {reply.link && (
                                <Image className="h-auto w-full min-w-full mb-4 rounded-3xl" src={reply.link} height={300} width={500} alt="Attached Media for Post" />
                            )}

                            <div className="mt-2 inline-flex justify-center content-center items-center ml-1 text-md max-sm:text-sm">
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