import { 
    type NextPage,
} from "next"
import Image from "next/image";
import { api } from "~/utils/api";
import CreatePost from "./components/createpost";

const Feed: NextPage = () => {
    const { data, isLoading, isError } = api.posts.getAll.useQuery();

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="w-9/2">
                <div className="inline-flex justify-between w-full mb-8">
                    <h1 className="text-3xl">Moxie</h1>
                    <p>Settings</p>
                </div>
            <CreatePost />
            {data?.map(({post, user}) => {
                return (
                    <div key={post.id} className="border border-stone-300 w-full p-8">
                        <div className="flex">
                            <Image className="rounded-full" src={user?.profileImageURL!} height={50} width={50} alt="Profile Picture" />
                            <div className="flex">
                                <div className="block">
                                <h3>@{user?.userName}</h3>
                                </div> 
                                <h3>{post.body}</h3>
                            </div> 
                        </div>
                        {post.link && (
                        <div className="p-8">
                            <Image src={post?.link} height={ 300 } width={ 500 } alt="Attached Media for Post" />
                        </div>
                        )}
                    </div>
                )
            })}

            </div>
        </div>
    )
  }

  export default Feed