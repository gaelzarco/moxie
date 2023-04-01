import Image from "next/dist/client/image";
import { useRouter } from "next/router";
import { FiHeart, FiMessageCircle, FiShare, FiMoreHorizontal, FiArrowLeft } from 'react-icons/fi'

interface PostDataProps {
    data: {
        post: {
            id: string;
            body: string;
            media: string | null;
            link: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
        },
        user: {
            id: string;
            userName: string | null;
            firstName: string | null;
            profileImageURL: string;
        }
    }
}

const PostView = ({ data }: PostDataProps) => {
    const router = useRouter();
    const { post, user } = data;

    return (
        <div className="overflow-y-scroll h-full bg-white md:max-2xl:w-9/12 md:max-2xl:right-0 max-2xl:absolute">
            <div id='header' className="sticky top-0 backdrop-blur-lg p-4 w-full inline-flex items-center border-b border-stone-300">
                <FiArrowLeft className="text-stone-800 hover:cursor-pointer" size={22} onClick={() => router.back()}/>
                <h2 className="ml-5 text-2xl font-bold">
                {user.firstName}
                </h2>
            </div>
            <div className="flex w-full">
            <div key={post.id} className="text-left w-full min-w-full p-4">
                <div className="flex leading-none">
                    <Image className="rounded-full w-10 h-10" src={user.profileImageURL} height={50} width={50} alt="Profile Picture" />
                    <div className="pl-2 mb-1 w-full">
                        <div className="inline-flex mb-6 w-full justify-between">
                        <div className="inline-flex items-center">
                            <p className="pl-2 font-medium">Gael Zarco</p>
                            <p className="text-stone-500 text-md hover:cursor-pointer pl-2">@{user.userName === null ? 'username' : user.userName}</p>
                        </div>
                        <FiMoreHorizontal className="text-stone-500 hover:cursor-pointer" size={22}/>
                        </div>
                        <h4 className="pl-2 mb-6">{post.body}</h4>
                        {post.link && (
                        <Image className="h-auto w-full min-w-full mb-4 rounded-3xl" src={post.link} height={300} width={500} alt="Attached Media for Post" />
                        )}
                        <div className="mt-1 inline-flex ml-2">
                        <FiHeart className="hover:cursor-pointer text-stone-800" size={20}/>
                        <FiMessageCircle className="hover:cursor-pointer text-stone-800 ml-20" size={20}/>
                        <FiShare className="hover:cursor-pointer text-stone-800 ml-20 align-right" size={20}/>
                        </div>
                    </div> 
                </div> 
            </div>
        </div>
        </div>
    )
}

export default PostView