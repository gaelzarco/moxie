import { type NextPage } from "next"
import { api } from "~/utils/api";

const Feed: NextPage = () => {
    const { data } = api.posts.getAll.useQuery();

    console.log(data)

    return (
        <div className='h-screen w-screen bg-black text-white flex flex-col items-center justify-center'>
            <h2>Feed</h2>
            {data?.map((post) => {
                return (
                    <div key={post.id} className='flex flex-col items-center justify-center'>
                        <h3>{post.body}</h3>
                        <p>{post.userId}</p>
                    </div>
                )
            })}
        </div>
    )
  }

  export default Feed