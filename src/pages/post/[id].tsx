import type { NextPage, GetStaticProps } from "next";
import { api } from "~/utils/api";
import { useUser } from '@clerk/nextjs'
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

import CreatePost from "../components/createpost";
import PostView from "../components/postview";

const Post: NextPage<{ id: string }> = ({ id }) => {
    const { isSignedIn } = useUser()
    const { data, isLoading } = api.posts.getOne.useQuery(id)

    if (isLoading) return <div>Loading...</div>
    if(!data) return <div>Something went wrong...</div>

    return (
        <div className="h-auto min-h-screen bg-white min-w-750 md:max-2xl:w-9/12 md:max-2xl:right-0 max-2xl:absolute border-b border-x border-stone-300">
            <PostView data={data} />
            {!!isSignedIn && <CreatePost />}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = generateSSGHelper()

    const id = context.params?.id
    console.log(id)

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