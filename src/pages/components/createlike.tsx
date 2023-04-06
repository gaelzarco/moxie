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

const CreateLike: NextPage<Like> = ( { postId, replyId, postType, likeType, liked } : Like ) => {

    const context = api.useContext()

    const postLike = api.likes.handlePostLike.useMutation({
        onSuccess: () => context.posts.getOneById.fetch(postId)
    })
    const postsLike = api.likes.handlePostLike.useMutation({
        onSuccess: () => context.posts.getAll.fetch()
    })
    const replyLike = api.likes.handleReplyLike.useMutation({
        onSuccess: () =>  context.replies.getAllByPostId.fetch(postId)
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

    <FiHeart
        className="hover:cursor-pointer text-stone-800"
        size={20}
        onClick={likeHandler}
        color={liked ? 'red' : 'black'}
    />

  )
}

export default CreateLike;