import { type NextPage } from "next"
import { api } from "~/utils/api";

import CreatePost from "./components/createpost";

const Feed: NextPage = () => {
    const { data } = api.posts.getAll.useQuery();

    return (
        <div className='flex flex-col items-center justify-center'>
            <CreatePost />
            <h2>Feed</h2>
            {data?.map((post) => {
                return (
                    <div key={post.id} className='flex flex-col items-center justify-center'>
                        <h3>{post.body}</h3>
                        <p>{post.userId}</p>
                        {post.link && (
                            <img src={post.link} style={{ height:'300px' }} alt="Post Media"/>
                        )}
                    </div>
                )
            })}
        </div>
    )
  }

  export default Feed