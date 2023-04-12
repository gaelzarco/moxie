import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useUser } from '@clerk/nextjs'
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

import CreatePost from "../components/createpost";
import PostView from "../components/postview";
import RepliesView from "../components/repliesview";
import Loading from "../components/loading";
import { CaretLeftIcon } from "@radix-ui/react-icons";

const Post: NextPage<{ postId: string }> = ({ postId }) => {
    const postQuery = api.posts.getOneById.useQuery(postId)
    const replyQuery = api.replies.getAllByPostId.useQuery(postId)
    const { isSignedIn } = useUser()
    const apiContext = api.useContext()
    const router = useRouter()

    if (postQuery.isLoading || replyQuery.isLoading) return <Loading />
    if (!postQuery.data || !replyQuery.data) return <div>Something went wrong...</div>

    return (
        <div className="h-auto min-h-screen w-full pb-5 dark:bg-black max-w-[750px]">

            <div className="sticky top-0 backdrop-blur-lg h-[80px] pl-5 w-full inline-flex items-center z-10">
                <CaretLeftIcon className="dark:text-white hover:cursor-pointer h-5 w-5"
                    onClick={(event) => {
                        event.preventDefault();
                        void apiContext.posts.getAll.refetch().then(() => router.push('/'))
                        .catch((err) => console.log(err))
                    }}
                />
                <h2 className="ml-5 text-2xl font-bold">
                    {`${postQuery.data.user.firstName}'s Post`}
                </h2>
            </div>

            <div className='flex items-center justify-center'>
                <div className="mx-auto text-left w-full">
                {!!postQuery.data && <PostView {...postQuery.data} />}
                {!!isSignedIn && <CreatePost postId={postId} reply/>}
                {!!replyQuery.data && <RepliesView {...replyQuery.data} />}
                </div>
            </div>
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