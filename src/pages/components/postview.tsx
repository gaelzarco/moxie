import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiMessageCircle, FiShare, FiMoreHorizontal,  } from 'react-icons/fi'

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
            profileImageURL: string;
        }
    }[]
}

const PostView = ({ data }: PostDataProps) => {
    return (
        <>
        {!!data && (data.map(({ post, user }) => {
            return (
                <div key={post.id} className="m-auto text-left border-x border-b border-stone-300 w-full min-w-full p-4">
                <div className="flex leading-none">
                    <Image className="rounded-full w-10 h-10" src={user.profileImageURL} height={50} width={50} alt="Profile Picture" />
                    <Link href={`post/${post.id}`} className="w-full">
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
                    </Link>
                </div> 
                </div>
              )
          }))}
        </>
    )
}

export default PostView;