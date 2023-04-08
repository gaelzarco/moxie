import type { NextPage } from 'next'
import { useState } from 'react';
import { type RouterInputs, api } from "~/utils/api";

import { FiHeart } from 'react-icons/fi'

type Like = {
    postId: RouterInputs['likes']['handlePostLike']['postId'];
    replyId?: RouterInputs['likes']['handleReplyLike']['replyId'];
    postType: RouterInputs['likes']['handlePostLike']['postType'] | RouterInputs['likes']['handleReplyLike']['postType'];
    likeType: 'FEED'| 'POST' | 'REPLY'
    liked?: boolean;
    likesArrLength: number;
}

const CreateLike: NextPage<Like> = ({ postId, replyId, postType, likeType, liked, likesArrLength }) => {

    const [ likedBool, setLikedBool ] = useState(liked)
    const [ likesLength, setLikesLength ] = useState(likesArrLength)

    const context = api.useContext()

    const postLike = api.likes.handlePostLike.useMutation({
        onSuccess: async () => {
            await context.posts.getOneById.fetch(postId)
            .catch(err => console.log(err))
        }
    })
    const postsLike = api.likes.handlePostLike.useMutation({
        onSuccess: async () => {
            await context.posts.getAll.fetch()
            .catch(err => console.log(err))
        }
    })
    const replyLike = api.likes.handleReplyLike.useMutation({
        onSuccess: async () => {
            await context.replies.getAllByPostId.fetch(postId)
            .catch(err => console.log(err))
        }
    })

    const likeHandler = () => {
        if (likeType === 'POST' && postType === 'POST' && postId) {
            postLike.mutate({
                postId: postId,
                postType: postType
            })
        } else if (likeType === 'FEED' && postType === 'POST' && postId) {
            postsLike.mutate({
                postId: postId,
                postType: postType
            })
        } else if (postType === 'REPLY' && postType === 'REPLY' && replyId) {
            replyLike.mutate({
                replyId: replyId,
                postType: postType
            })
        } else {
            throw new Error('Like type could not be determined.')
        }
    }

  return (

        <>
            <FiHeart
                className={`hover:cursor-pointer ${likedBool ? 'text-red-600' : 'dark:text-white text-black'}`}
                size={20}
                onClick={() => {
                    likeHandler()
                    setLikedBool(!likedBool)
                    setLikesLength(!likedBool ? likesLength + 1 :  likesLength - 1)
                }}
            />
            <p className='ml-2'>{likesLength}</p>
        </>

  )
}

export default CreateLike;