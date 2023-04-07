import type { NextPage, GetStaticProps } from "next";
import { useUser } from '@clerk/nextjs'
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

import CreatePost from "../components/createpost";
import PostView from "../components/postview";
import RepliesView from "../components/repliesview";
import Loading from "../components/loading";

const Post: NextPage<{ postId: string }> = ({ postId }) => {
    const postQuery = api.posts.getOneById.useQuery(postId)
    const replyQuery = api.replies.getAllByPostId.useQuery(postId)
    const { isSignedIn } = useUser()

    if (postQuery.isLoading || replyQuery.isLoading) return <Loading />
    if (!postQuery.data || !replyQuery.data) return <div>Something went wrong...</div>

    return (
        <div className="h-auto min-h-screen dark:bg-neutral-900 min-w-750 w-full md:max-2xl:w-9/12 md:max-2xl:right-0 max-2xl:absolute border-b border-x dark:border-stone-700">
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