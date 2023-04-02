import type { NextPage, GetStaticProps } from "next";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useUser } from '@clerk/nextjs'
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

import CreatePost from "../components/createpost";
import PostView from "../components/postview";

import { FiArrowLeft } from 'react-icons/fi';

const Post: NextPage<{ id: string }> = ({ id }) => {
    const { data, isLoading } = api.posts.getOne.useQuery(id)
    const { user, isSignedIn } = useUser()
    const router = useRouter()

    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>Something went wrong...</div>

    return (
        <div className="h-auto min-h-screen bg-white min-w-750 md:max-2xl:w-9/12 md:max-2xl:right-0 max-2xl:absolute border-b border-x border-stone-300">
            {!!user && (
                <div id='header' className="sticky top-0 backdrop-blur-lg p-4 w-full inline-flex items-center border-b border-stone-300">
                <FiArrowLeft className="text-stone-800 hover:cursor-pointer"
                size={22} 
                onClick={(event) => {
                    event.preventDefault();
                     router.back()
                     }}
                />
                <h2 className="ml-5 text-2xl font-bold">
                {user.firstName}
                </h2>
            </div>
            )}
            {!!data && <PostView {...data} />}
            {!!isSignedIn && <CreatePost />}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = generateSSGHelper()

    const id = context.params?.id

    if (typeof id !== 'string') throw new Error ('Invalid post id')

    await ssg.posts.getOne.prefetch(id)

    return {
        props: {
            trpcState: ssg.dehydrate(),
            id
        }
    }
}

export const getStaticPaths = () => {
    return { paths: [], fallback: "blocking" };
  };

export default Post;