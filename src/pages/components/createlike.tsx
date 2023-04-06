import type { NextPage } from 'next'
import { type RouterInputs, api } from "~/utils/api";
import { FiHeart } from 'react-icons/fi'

type Like = {
    postId: RouterInputs['likes']['handlePostLike']['postId'];
    replyId?: RouterInputs['likes']['handleReplyLike']['replyId'];
    postType: RouterInputs['likes']['handlePostLike']['postType'] | RouterInputs['likes']['handleReplyLike']['postType'];
    likeType: 'FEED'| 'POST' | 'REPLY'
    liked?: boolean;
}

const CreateLike: NextPage<Like> = ( { postId, replyId, postType, likeType, liked }: Like ) => {
    
    const post = api.posts.getOneById
    const posts = api.posts.getAll
    const replies = api.replies.getAllByPostId

    const postLike = api.likes.handlePostLike.useMutation({ onSuccess: () => post.useQuery(postId) })
    const postsLike = api.likes.handlePostLike.useMutation({ onSuccess: () => posts.useQuery() })
    const replyLike = api.likes.handleReplyLike.useMutation({ onSuccess: () => replies.useQuery(postId) })

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
            throw new Error('Type of like could not be determined.')
        }
    }

  return (

    <FiHeart
        className="hover:cursor-pointer text-stone-800"
        size={20}
        onClick={likeHandler}
        color={liked ? 'red' : 'black'}
    />

  )
}

export default CreateLike;