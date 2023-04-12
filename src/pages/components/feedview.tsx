import type { NextPage } from 'next'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs';
import type { RouterOutputs } from "~/utils/api";
import Link from "next/link";

import CreateLike from './createlike';
import UserProfileHoverCard from './hovercard';
import AspectRatioImage from './aspectratioimage';
import DropDownMenu from './dropdownmenu';
import Toast from './toast';
import { Share1Icon, ChatBubbleIcon } from '@radix-ui/react-icons';

type PostsWithUsersAndImages = RouterOutputs["posts"]["getAll"]

const FeedView: NextPage<PostsWithUsersAndImages> = ( data ) => {

    const authUser = useUser()
    const [ toastBool, setToastBool ] = useState(false)

    const toastHandler = () => {
        setToastBool(true)

        setTimeout(() => {
            setToastBool(false)
        }, 2500)
    }
    
    return (
        <>

        { toastBool ? (
            <Toast title='Link copied to clipboard!' activateToast /> 
        ) : null }

        {!!data && (Object.values(data).map(({ post, user }) => {
            return (
                <div key={post.id} className="cursor-default m-auto text-left w-11/12 p-3 rounded-xl mt-5 dark:text-white dark:bg-neutral-900">
                    <div className="flex leading-none">
                        <UserProfileHoverCard
                            url={user.profileImageURL}
                            firstName={user.firstName}
                            userName={user.userName}
                            userBio='This is my profile page'
                        />
                        <div className="pl-2 mb-1 w-full">
                            <div className="inline-flex mb-6 w-full items-center justify-between">
                                <div className="inline-flex content-center justify-center">
                                    <p className="pl-2 font-medium">{user.firstName}</p>
                                    <p className="text-stone-500 text-md hover:cursor-pointer pl-2">@{user.userName === null ? 'username' : user.userName}</p>
                                </div>
                                <DropDownMenu postId={post.id} postType='POST' deleteType='FEED'/>
                            </div>

                            <Link href={`post/${post.id}`} className="w-full">
                                <h4 className="pl-2 mb-6 leading-5">{post.body}</h4>
                                {post.link && (
                                    <AspectRatioImage src={post.link} alt="Attached Media for Post" />
                                )}
                            </Link>
                            <div className="mt-2 inline-flex ml-2">
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
                                    <ChatBubbleIcon className="hover:cursor-pointer dark:text-white ml-20 h-5 w-5" />
                                    <p className='ml-2'>{post.replies.length}</p>
                                </div>
                                <Share1Icon 
                                    className="hover:cursor-pointer dark:text-white ml-20 h-5 w-5 align-right" 
                                    onClick={() => {
                                        navigator.clipboard.writeText(`https://moxie-x.vercel.app/post/${post.id}`)
                                        .then(toastHandler)
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