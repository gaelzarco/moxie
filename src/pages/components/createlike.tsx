import type { NextPage } from 'next'
import { useState, useRef } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { type RouterInputs, api } from "~/utils/api";

import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import Toast from './toast';

type Like = {
    postId: RouterInputs['likes']['handlePostLike']['postId'];
    replyId?: RouterInputs['likes']['handleReplyLike']['replyId'];
    postType: RouterInputs['likes']['handlePostLike']['postType'] | RouterInputs['likes']['handleReplyLike']['postType'];
    likeType: 'FEED'| 'POST' | 'REPLY'
    liked?: boolean;
    likesArrLength: number;
}

const CreateLike: NextPage< Like > = ({ postId, replyId, postType, likeType, liked, likesArrLength }) => {

    const { isSignedIn } = useUser()
    const context = api.useContext()

    const [ likedBool, setLikedBool ] = useState(liked)
    const [ likesLength, setLikesLength ] = useState(likesArrLength)
    const failedToastRef = useRef<{ publish: () => void }>()

    const postLike = api.likes.handlePostLike.useMutation({
        onSuccess: async () => {
            await context.posts.getOneById.refetch(postId)
            .catch(err => console.log(err))
        }
    })
    const postsLike = api.likes.handlePostLike.useMutation({
        onSuccess: async () => {
            await context.posts.getAll.refetch()
            .catch(err => console.log(err))
        }
    })
    const replyLike = api.likes.handleReplyLike.useMutation({
        onSuccess: async () => {
            await context.replies.getAllByPostId.refetch(postId)
            .catch(err => console.log(err))
        }
    })

    const likeHandler = () => {
        if (likeType === 'POST' && postType === 'POST' && postId) {
            postLike.mutate({ postId: postId, postType: postType })
        } else if (likeType === 'FEED' && postType === 'POST' && postId) {
            postsLike.mutate({ postId: postId, postType: postType })
        } else if (likeType === 'REPLY' && postType === 'REPLY' && replyId) {
            replyLike.mutate({ replyId: replyId, postType: postType })
        } else {
            failedToastRef.current?.publish()
        }
    }

    if (!isSignedIn) return (
        <>
            <SignInButton>
                <HeartIcon className='hover:cursor-default w-5 h-5 dark: text-white text-black'/>
            </SignInButton>
            <p className='ml-2'>{likesLength}</p>
        </>
    )

  return (
    <>
    <Toast forwardedRef={failedToastRef} title={`${replyId ? 'Reply' : 'Post'}` + ' could not be deleted.'} error />

    {likedBool ? (
        <HeartFilledIcon
            className='hover:cursor-pointer w-5 h-5 text-red-500'
            onClick={() => {
                likeHandler()
                setLikedBool(!likedBool)
                setLikesLength(!likedBool ? likesLength + 1 :  likesLength - 1)
            }}
        />
    ) : (
        <HeartIcon
            className='hover:cursor-pointer w-5 h-5 dark:text-white text-black'
            onClick={() => {
                likeHandler()
                setLikedBool(!likedBool)
                setLikesLength(!likedBool ? likesLength + 1 :  likesLength - 1)
            }}
        />
    )}
        <p className='ml-2'>{likesLength}</p>
    </>
  )
}

export default CreateLike;