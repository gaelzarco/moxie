import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
// import { useUser } from '@clerk/nextjs'
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

import Header from "../components/header";
// import CreatePost from "../components/createpost";
// import PostView from "../components/postview";
// import RepliesView from "../components/repliesview";
import Loading from "../components/loading";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import UserView from "../components/userview";

const Post: NextPage<{ userId: string }> = ({ userId }) => {
    // const postQuery = api.posts.getOneById.useQuery(userId)
    // const replyQuery = api.replies.getAllByPostId.useQuery(userId)
    const userQuery = api.users.getOneById.useQuery(userId)
    // const { isSignedIn } = useUser()
    const apiContext = api.useContext()
    const router = useRouter()

    if (userQuery.isLoading) return <Loading />
    if (!userQuery.data) return <div>Something went wrong...</div>

    return (
        <>
            <Head>
                <title>{`Moxie ✦ ${userQuery.data.firstName as string}`}</title>
                <meta name="description" content={`Checkout ${userQuery.data.firstName as string}` + "'s profile ✦ Moxie"} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="h-auto min-h-screen w-full pb-5 dark:bg-black max-w-[750px]">

                <Header>
                    <CaretLeftIcon className="dark:text-white hover:cursor-pointer h-5 w-5"
                        onClick={(event) => {
                            event.preventDefault();
                            void apiContext.posts.getAll.refetch()
                            .then(!router.query.previousPage ? () => router.push('/') : () => router.back())
                            .catch((err) => console.log(err))
                        }}
                    />
                    <h2 className="ml-5 text-2xl font-bold">
                        {`${userQuery.data.firstName as string}`}
                    </h2>
                </Header>

                <div className='flex items-center justify-center'>
                    <div className="mx-auto text-left w-full">
                        {!!userQuery.data && <UserView {...userQuery.data} />}
                        {/* {!!replyQuery.data && <RepliesView {...replyQuery.data} />} */}
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