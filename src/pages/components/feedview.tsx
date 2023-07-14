import type { NextPage } from 'next'
import { useRef } from 'react'
import { useUser } from '@clerk/nextjs';
import type { RouterOutputs } from "~/utils/api";
import Link from "next/link";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import Header from './header';
import CreateLike from './createlike';
import ProfileHoverCard from './profilehovercard';
import AspectRatioImage from './aspectratioimage';
import PostOptionsDropDown from './dropdownmenus';
import Toast from './toast';
import { Share1Icon, ChatBubbleIcon } from '@radix-ui/react-icons';

type Posts = {
    posts: RouterOutputs["posts"]["getAll"] | RouterOutputs["posts"]["getAllByUserId"]
    userView?: boolean
}

const FeedView: NextPage< Posts > = ({ posts, userView }) => {

    const authUser = useUser()
    const toastRef = useRef<{ publish: () => void }>()
    const [ parent ] = useAutoAnimate()
    
    return (
        <>
        <Toast forwardedRef={toastRef} title='Link copied to clipboard!' /> 

        <Header noNav>
            <h2 className="ml-5 mt-2 text-2xl font-semibold">
                Posts
            </h2>
        </Header>

        {!posts || Object.keys(posts).length === 0 && (
            <div className="cursor-default text-center flex flex-col items-center content-center justify-center w-11/12 p-5 rounded-xl mt-5 mb-20 text-neutral-500">
                <h1>Nothing to see here</h1>
            </div>
        )}

        <div ref={parent} className='w-full h-auto'>
            {!!posts && (Object.values(posts).map(({ post, user }) => {
                return (
                    <div key={post.id} className="shadow-xl dark:shadow-none cursor-default mx-auto text-left w-11/12 p-8 max-md:p-6 rounded-xl mt-5 dark:text-white bg-neutral-100 dark:bg-neutral-900">
                        <div className="flex leading-none">
                            <div className='h-min'>
                                <ProfileHoverCard {...user}/>
                            </div>
                            <div className="mb-1 w-full">
                                <div className="inline-flex mb-6 w-full items-center justify-between">
                                        <div className="inline-flex content-center justify-center items-center">
                                            <Link href={`/profile/${user.id}`} className="hover:cursor-pointer inline-flex justify-center content-center items-center">
                                                <p className="font-semibold pl-2">{user.firstName}</p>
                                                <p className="text-neutral-500 text-md max-sm:text-sm pl-2">@{!user.userName ? 'username' : user.userName}</p>
                                            </Link>
                                            <p className="text-neutral-500 text-sm max-sm:text-xs pl-1">
                                                {` · ${dayjs(post.createdAt).fromNow()}`}
                                            </p>
                                        </div>
                                    {authUser.user?.id === user.id && userView && (
                                        <PostOptionsDropDown userId={user.id} postId={post.id} postType='POST' deleteType='PROFILE'/>
                                    )}
                                    {authUser.user?.id === user.id && !userView && (
                                        <PostOptionsDropDown postId={post.id} postType='POST' deleteType='FEED'/>
                                    )}
                                </div>

                                <Link href={`/post/${post.id}`} className="w-full">
                                    <h4 className="pl-2 mb-6 leading-5">{post.body}</h4>
                                    {post.link && (
                                        <AspectRatioImage src={post.link} alt="Attached Media for Post" />
                                    )}
                                </Link>

                                <div className="mt-2 inline-flex justify-center content-center items-center ml-1 text-md max-sm:text-sm">
                                    <div className="inline-flex w-auto justify-between">
                                        <CreateLike 
                                            postId={post.id} 
                                            postType='POST' 
                                            likeType='FEED'
                                            liked={post.likes.find((like) => like.userId === authUser.user?.id) ? true : false}
                                            likesArrLength={post.likes.length}
                                        />
                                    </div>
                                    <div className="inline-flex w-auto justify-between">
                                        <Link href={`/post/${post.id}`} className='flex'>
                                            <ChatBubbleIcon className="hover:cursor-pointer dark:text-white ml-16 h-5 w-5" />
                                            <p className='ml-2'>{post._count.replies}</p>
                                        </Link>
                                    </div>
                                    <Share1Icon 
                                        className="hover:cursor-pointer dark:text-white ml-16 h-5 w-5 align-right" 
                                        onClick={() => {
                                            navigator.clipboard.writeText(`https://moxie-x.vercel.app/post/${post.id}`)
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
        </div>
        </>
    )
}

export default FeedView;