import { NextPage } from "next"
import { api } from "~/utils/api";

const Feed: NextPage = () => {
    const posts = api.posts.getAll.useQuery();

    return (
        <div className='h-screen w-screen bg-black text-white flex flex-col items-center justify-center'>
            <h2>Feed</h2>
        </div>
    )
  }

  export default Feed