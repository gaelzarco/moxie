import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useUser } from '@clerk/nextjs'

import CreatePost from "../components/createpost";
import PostView from "../components/postview";

const Post = () => {
    const router = useRouter();
    const { id } = router.query;

    const { isSignedIn } = useUser()
    const{ data, isLoading } = api.posts.getOne.useQuery(id as string);

    if (isLoading) return <div>Loading...</div>
    if(!data) return <div>Something went wrong...</div>

    return (
        <>
            {!!isSignedIn && <CreatePost />}
            {!!data && (
                <PostView data={data} />
            )}
        </>
    )
}

export default Post;