import type { NextPage } from 'next'
import { useRouter } from "next/router";
import { useUser } from '@clerk/nextjs';
import { type RouterOutputs, api } from "~/utils/api";
import Image from "next/image";

import CreateLike from "./createlike";
import UserProfileHoverCard from './hovercard';
import { FiMessageCircle, FiShare, FiMoreHorizontal, FiArrowLeft } from 'react-icons/fi'

type PostWithUserAndImage = RouterOutputs["posts"]["getOneById"]

const PostView: NextPage<PostWithUserAndImage> = ( data ) => {
    
    const authUser = useUser()
    const apiContext = api.useContext()
    const router = useRouter()
    const { post, user } = data;

    return (
        <>
        {(!!post && !!user) && (
            <div className="w-full min-w-full cursor-default">
                <div id='header' className="sticky top-0 backdrop-blur-lg p-4 w-full inline-flex items-center border-b dark:border-stone-700">
                    <FiArrowLeft className="dark:text-white hover:cursor-pointer"
                        size={22} 
                        onClick={(event) => {
                            event.preventDefault();
                            void apiContext.posts.getAll.refetch().then(() => router.back())
                            .catch((err) => console.log(err))
                        }}
                    />
                    <h2 className="ml-5 text-2xl font-bold">
                    {user.firstName}
                    </h2>
                </div>
                <div key={post.id} className="text-left w-full min-w-full p-4">
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
                            <FiMoreHorizontal className="dark:text-white  hover:cursor-pointer" size={22}/>
                            </div>
                            <h4 className="pl-2 mb-6">{post.body}</h4>
                            {post.link && (
                            <Image className="h-auto w-full min-w-full mb-4 rounded-3xl" src={post.link} height={300} width={500} alt="Attached Media for Post" />
                            )}
                            <div className="mt-1 inline-flex ml-2">
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
                                <FiMessageCircle className="hover:cursor-pointer dark:text-white ml-20" size={20}/>
                                <p className='ml-2'>{post.replies.length}</p>
                            </div>
                            <FiShare className="hover:cursor-pointer dark:text-white ml-20 align-right" size={20}/>
                            </div>
                        </div> 
                    </div> 
                </div>
            </div>
        )}
    </>
    )
}

export default PostView