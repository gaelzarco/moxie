import { 
    type NextPage,
} from "next"
import Image from "next/image";
import { api } from "~/utils/api";
import CreatePost from "./components/createpost";

const Feed: NextPage = () => {
    const { data } = api.posts.getAll.useQuery();

    return (
        <div className='flex flex-col items-center justify-center'>
            <CreatePost />
            <h2>Feed</h2>
            {data?.map(({post, user}) => {
                return (
                    <div key={post.id} className='flex'>
                        <div>
                            <h3>{user?.userName}</h3>
                            <Image src={user?.profileImageURL!} height={50} width={50} alt="Profile Picture" />
                        </div>
                        <h3>{post.body}</h3>
                        {post.link && (
                            <div>
                                <Image src={post.link} height={500} width={ 500 } alt="Attached Media for Post" />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
  }

  export default Feed