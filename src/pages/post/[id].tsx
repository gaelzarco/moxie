import { useRouter } from "next/router";
import { api } from "~/utils/api";

import PostView from "../components/postview";

const Post = () => {
    const router = useRouter();
    const { id } = router.query;

    const{ data, isLoading } = api.posts.getOne.useQuery(id as string);

    if (!!isLoading) return <div>Loading...</div>
    if(!data) return <div>Something went wrong...</div>

    if (!!data) return <PostView data={data} />
}

export default Post;