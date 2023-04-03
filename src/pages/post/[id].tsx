import type { NextPage, GetStaticProps } from "next";
import { api } from "~/utils/api";
import { useUser } from '@clerk/nextjs'
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

import CreatePost from "../components/createpost";
import PostView from "../components/postview";
import RepliesView from "../components/repliesview";

const Post: NextPage<{ postId: string }> = ({ postId }) => {
    const postQuery = api.posts.getOneById.useQuery(postId)
    const replyQuery = api.replies.getAllByPostId.useQuery(postId)
    const { isSignedIn } = useUser()

    if (postQuery.isLoading || replyQuery.isLoading) return <div>Loading...</div>
    if (!postQuery.data || !replyQuery.data) return <div>Something went wrong...</div>

    return (
        <div className="h-auto min-h-screen bg-white min-w-750 md:max-2xl:w-9/12 md:max-2xl:right-0 max-2xl:absolute border-b border-x border-stone-300">
            {!!postQuery.data && <PostView {...postQuery.data} />}
            {!!isSignedIn && <CreatePost postId={postId} reply/>}
            {!!replyQuery.data && <RepliesView {...replyQuery.data} />}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = generateSSGHelper()

    const postId = context.params?.id

    if (typeof postId !== 'string') throw new Error ('Invalid post ID')

    await ssg.posts.getOneById.prefetch(postId)

    return {
        props: {
            trpcState: ssg.dehydrate(),
            postId
        }
    }
}

export const getStaticPaths = () => {
    return { paths: [], fallback: "blocking" };
  };

export default Post;