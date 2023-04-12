import type { NextPage } from 'next'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { type RouterOutputs } from "~/utils/api";
import Image from "next/image";

import CreateLike from "./createlike";
import UserProfileHoverCard from './hovercard';
import DropDownMenu from './dropdownmenu';
import Toast from './toast';
import { Share1Icon, ChatBubbleIcon } from '@radix-ui/react-icons';

type PostWithUserAndImage = RouterOutputs["posts"]["getOneById"]

const PostView: NextPage<PostWithUserAndImage> = ( data ) => {
    
    const authUser = useUser()
    const { post, user } = data;
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

        {(!!post && !!user) && (
            <div key={post.id} className="mx-auto text-left w-11/12 p-6 rounded-xl mt-5 dark:text-white dark:bg-neutral-900">
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
                                <p className="pl-2 font-medium">Gael Zarco</p>
                                <p className="text-stone-500 text-md hover:cursor-pointer pl-2">@{user.userName === null ? 'username' : user.userName}</p>
                            </div>
                            <DropDownMenu postId={post.id} postType='POST' deleteType='POST'/>
                        </div>
                        <h4 className="pl-2 mb-6 leading-5">{post.body}</h4>
                        {post.link && (
                        <Image className="h-auto w-full min-w-full mb-4 rounded-3xl" src={post.link} height={300} width={500} alt="Attached Media for Post" />
                        )}
                        <div className="mt-2 inline-flex ml-2">
                            <div className="inline-flex w-auto justify-between">
                                <CreateLike 
                                    postId={post.id} 
                                    postType="POST" 
                                    likeType='POST' 
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
                                    navigator.clipboard.writeText(`https://moxie-x.vercel.app/${user.userName}/post/${post.id}`)
                                    .then(toastHandler)
                                }} 
                            />
                        </div>
                    </div> 
                </div> 
            </div>
        )}
    </>
    )
}

export default PostView