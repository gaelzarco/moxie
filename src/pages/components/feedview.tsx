import type { NextPage } from 'next'
import { useUser } from '@clerk/nextjs';
import type { RouterOutputs } from "~/utils/api";
import Link from "next/link";

import CreateLike from './createlike';
import UserProfileHoverCard from './hovercard';
import AspectRatioImage from './aspectratioimage';
import DropDownMenu from './dropdownmenu';
import { FiMessageCircle, FiShare } from 'react-icons/fi'

type PostsWithUsersAndImages = RouterOutputs["posts"]["getAll"]

const FeedView: NextPage<PostsWithUsersAndImages> = ( data ) => {

    const authUser = useUser()
    
    return (
        <>
        {!!data && (Object.values(data).map(({ post, user }) => {
            return (
                <div key={post.id} className="m-auto text-left border-b dark:border-stone-700 w-full min-w-full p-4">
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
                        <DropDownMenu postId={post.id} postType='POST' deleteType='FEED'/>
                        </div>
                        <Link href={`post/${post.id}`} className="w-full">
                        <h4 className="pl-2 mb-6">{post.body}</h4>
                        {post.link && (
                            <AspectRatioImage src={post.link} alt="Attached Media for Post" />
                        )}
                        </Link>
                        <div className="mt-1 inline-flex ml-2">
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
                                <FiMessageCircle className="hover:cursor-pointer dark:text-white ml-20" size={20}/>
                                <p className='ml-2'>{post.replies.length}</p>
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

export default FeedView;