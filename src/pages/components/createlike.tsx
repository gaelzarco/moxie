import type { NextPage } from 'next'
import { type RouterInputs, api } from "~/utils/api";
import { FiHeart } from 'react-icons/fi'

type Like = RouterInputs["likes"]["createOne"]

const CreateLike: NextPage<Like> = ( { postId, replyId, postType }: Like ) => {
    const { mutate } = api.likes.createOne.useMutation({
        onSuccess: (data) => {
            console.log(data)
        }
    })

    const likeHandler = () => {
        if (!postId && !replyId) throw new Error("ID not provided")

        if ((postId && postType === 'POST') || (replyId && postType === 'REPLY')) {
            mutate({
                postId: postId,
                replyId: replyId,
                postType: postType
            })
        }
    }

  return <FiHeart className="hover:cursor-pointer text-stone-800" size={20} onClick={likeHandler}/>
}

export default CreateLike;