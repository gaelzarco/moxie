import type { NextPage } from 'next'
import { useRef } from 'react'
import { useUser } from '@clerk/nextjs';
import { type RouterOutputs } from "~/utils/api";
import Image from "next/image";

import CreateLike from "./createlike";
import UserProfileHoverCard from './hovercard';
import PostOptionsDropDown from './dropdownmenus';
import Toast from './toast';
import { Share1Icon, ChatBubbleIcon } from '@radix-ui/react-icons';

type PostWithUserAndImage = RouterOutputs["posts"]["getOneById"]

const PostView: NextPage< PostWithUserAndImage > = ( data ) => {
    
    const authUser = useUser()
    const { post, user } = data;
    const toastRef = useRef<{ publish: () => void }>()

    return (
        <>

        <Toast forwardedRef={toastRef} title='Link copied to clipboard!' /> 

        {(!!post && !!user) && (
            <div key={post.id} className="cursor-default mx-auto text-left w-11/12 p-5 rounded-xl mt-5 dark:text-white dark:bg-neutral-900">
                <div className="flex leading-none">
                    <UserProfileHoverCard {...user}/>
                    <div className="pl-2 mb-1 w-full">
                        <div className="inline-flex mb-6 w-full items-center justify-between">
                            <div className="inline-flex content-center justify-center">
                                <p className="pl-2 font-medium">{user.firstName}</p>
                                <p className="text-stone-500 text-md hover:cursor-pointer pl-2">@{!user.userName ? 'username' : user.userName}</p>
                            </div>
                            <PostOptionsDropDown postId={post.id} postType='POST' deleteType='POST'/>
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
                                <p className='ml-10'>{post.replies.length}</p>
                                <h3 className="dark:text-white ml-2 h-5 w-5">Replies</h3>
                            </div>
                            <Share1Icon 
                                className="hover:cursor-pointer dark:text-white ml-20 h-5 w-5 align-right"
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
        )}
    </>
    )
}

export default PostView