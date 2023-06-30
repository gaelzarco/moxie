import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from '@clerk/nextjs'
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

import Header from "../components/header";
import CreatePost from "../components/createpost";
import PostView from "../components/postview";
import RepliesView from "../components/repliesview";
import Loading from "../components/loading";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { Jelly } from "@uiball/loaders";

const Post: NextPage<{ postId: string }> = ({ postId }) => {

    const postQuery = api.posts.getOneById.useQuery(postId)
    const replyQuery = api.replies.getAllByPostId.useQuery(postId)
    const { isSignedIn } = useUser()
    const apiContext = api.useContext()
    const router = useRouter()
    const [ loading, setLoading ] = useState(false)

    if (postQuery.isLoading || replyQuery.isLoading) return <Loading />
    if (!postQuery.data || !replyQuery.data) return <div>Something went wrong...</div>

    return (
        <>
            <Head>
                <title>{`Moxie · ${postQuery.data.user.firstName as string}` + "'s Post"}</title>
                <meta name="description" content={`Checkout ${postQuery.data.user.firstName as string}` + "'s post · Moxie"} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="h-auto min-h-screen w-full dark:bg-black max-w-[750px]">

                <Header>
                    <CaretLeftIcon className="dark:text-white h-6 w-6 bg-neutral-800 rounded-full hover:cursor-pointer"
                        onClick={() => {
                            setLoading(true)
                            void apiContext.posts.getAll.refetch()
                            .then(() => router.push('/'))
                            .catch((err) => console.log(err))
                        }}
                    />
                    <h2 className="ml-5 text-2xl font-bold">
                        {`${postQuery.data.user.firstName as string}` + "'s Post"}
                    </h2>

                    <span className="flex flex-row content-center justify-center ml-5 text-neutral-400">
                        {loading && <Jelly color='white' size={15}/>}
                    </span>
                </Header>

                <div className='flex items-center justify-center'>
                    <div className="mx-auto text-left w-full">
                        {!!postQuery.data && <PostView {...postQuery.data} />}
                        {!!isSignedIn && <CreatePost postId={postId} reply/>}
                        {!!replyQuery.data && <RepliesView replies={replyQuery.data} />}
                    </div>
                </div>

            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = generateSSGHelper()

    const postId = context.params?.id

    if (typeof postId !== 'string') throw new Error('Invalid post ID')

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