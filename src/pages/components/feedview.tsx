import type { NextPage } from 'next'
import { useRef } from 'react'
import { useUser } from '@clerk/nextjs';
import type { RouterOutputs } from "~/utils/api";
import Link from "next/link";

import Header from './header';
import CreateLike from './createlike';
import UserProfileHoverCard from './hovercard';
import AspectRatioImage from './aspectratioimage';
import PostOptionsDropDown from './dropdownmenus';
import Toast from './toast';
import { Share1Icon, ChatBubbleIcon } from '@radix-ui/react-icons';

type PostsWithUsersAndImages = RouterOutputs["posts"]["getAll"]

const FeedView: NextPage< PostsWithUsersAndImages > = ( posts ) => {

    const authUser = useUser()

    const toastRef = useRef<{ publish: () => void }>()
    
    return (
        <>

        <Toast forwardedRef={toastRef} title='Link copied to clipboard!' /> 

        <Header noNav>
            <h2 className="ml-5 text-2xl font-bold">
                Posts
            </h2>
        </Header>

        {!!posts && (Object.values(posts).map(({ post, user }) => {
            return (
                <div key={post.id} className="cursor-default mx-auto text-left w-11/12 p-5 rounded-xl mt-5 dark:text-white dark:bg-neutral-900">
                    <div className="flex leading-none">
                        <UserProfileHoverCard {...user}/>
                        <div className="pl-2 mb-1 w-full">
                            <div className="inline-flex mb-6 w-full items-center justify-between">
                                <div className="inline-flex content-center justify-center">
                                    <p className="pl-2 font-medium">{user.firstName}</p>
                                    <p className="text-stone-500 text-md hover:cursor-pointer pl-2">@{!user.userName ? 'username' : user.userName}</p>
                                </div>
                                {authUser.user?.id === user.id && (
                                    <PostOptionsDropDown postId={post.id} postType='POST' deleteType='FEED'/>
                                )}
                            </div>

                            <Link href={`post/${post.id}`} className="w-full">
                                <h4 className="pl-2 mb-6 leading-5">{post.body}</h4>
                                {post.link && (
                                    <AspectRatioImage src={post.link} alt="Attached Media for Post" />
                                )}
                            </Link>

                            <div className="mt-2 inline-flex ml-1">
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
                                    <Link href={`post/${post.id}`} className='flex'>
                                        <ChatBubbleIcon className="hover:cursor-pointer dark:text-white ml-16 h-5 w-5" />
                                        <p className='ml-2'>{post.replies.length}</p>
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
        </>
    )
}

export default FeedView;