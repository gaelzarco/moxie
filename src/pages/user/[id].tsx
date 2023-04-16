import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

import Header from "../components/header";
import UserView from "../components/userview";
import FeedView from "../components/feedview";
import RepliesView from "../components/repliesview";
import Loading from "../components/loading";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { Jelly } from "@uiball/loaders";

const Post: NextPage<{ userId: string }> = ({ userId }) => {

    const userQuery = api.users.getOneById.useQuery(userId)
    const postsQuery = api.posts.getAllByUserId.useQuery(userId)
    const repliesQuery = api.replies.getAllByUserId.useQuery(userId)
    const apiContext = api.useContext()
    const router = useRouter()
    const [ loading, setLoading ] = useState(false)

    if (userQuery.isLoading || postsQuery.isLoading) return <Loading />
    if (!userQuery.data) return <div>Something went wrong...</div>

    return (
        <>
            <Head>
                <title>{`Moxie · ${userQuery.data.filteredUser.firstName as string}`}</title>
                <meta name="description" content={`Checkout ${userQuery.data.filteredUser.firstName as string}` + "'s profile · Moxie"} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="h-auto min-h-screen w-full pb-5 dark:bg-black max-w-[750px]">

                <Header>
                    <CaretLeftIcon className="dark:text-white hover:cursor-pointer h-6 w-6"
                        onClick={() => {
                            setLoading(true)
                            void apiContext.posts.getAll.refetch()
                            .then(!router.query.previousPage ? () => router.push('/') : () => router.back())
                            .catch((err) => console.log(err))
                        }}
                    />
                    <h2 className="ml-5 text-2xl font-bold">
                        {`${userQuery.data.filteredUser.firstName}`}
                    </h2>

                    <span className="flex flex-row content-center justify-center ml-5 text-neutral-400">
                        {loading && <Jelly color='white' size={15}/>}
                    </span>
                </Header>

                <div className='flex items-center justify-center'>
                    <div className="mx-auto text-left w-full">
                        {!!userQuery.data && (
                        <UserView 
                        filteredUser={userQuery.data.filteredUser}
                        postCount={userQuery.data.postsCount}
                        replyCount={userQuery.data.repliesCount}
                        />
                        )}
                        {!!postsQuery.data && <FeedView {...postsQuery.data} />}
                        {!!repliesQuery.data ? <RepliesView {...repliesQuery.data} /> : <Loading />}
                    </div>
                </div>

            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = generateSSGHelper()

    const userId = context.params?.id

    if (typeof userId !== 'string') throw new Error('Invalid post ID')

    await ssg.users.getOneById.prefetch(userId)

    return {
        props: {
            trpcState: ssg.dehydrate(),
            userId
        }
    }
}

export const getStaticPaths = () => {
    return { paths: [], fallback: "blocking" };
  };

export default Post;