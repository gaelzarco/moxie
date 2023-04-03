import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import type { RouterOutputs } from "~/utils/api";
import { FiHeart, FiMessageCircle, FiShare, FiMoreHorizontal, FiArrowLeft } from 'react-icons/fi'

type PostWithUserAndImage = RouterOutputs["posts"]["getOneById"]

const PostView = ( data : PostWithUserAndImage ) => {
    const router = useRouter()
    const { post, user } = data;

    return (
        <>
        { (!!post && !!user) && (
            <div className="w-full">
                <div id='header' className="sticky top-0 backdrop-blur-lg p-4 w-full inline-flex items-center">
                    <FiArrowLeft className="text-stone-800 hover:cursor-pointer"
                    size={22} 
                    onClick={(event) => {
                        event.preventDefault();
                        router.back()
                        }}
                    />
                    <h2 className="ml-5 text-2xl font-bold">
                    {user.firstName}
                    </h2>
                </div>
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
                            <Link href={`post/${post.id}`}>
                                <h4 className="pl-2 mb-6">{post.body}</h4>
                                {post.link && (
                                <Image className="h-auto w-full min-w-full mb-4 rounded-3xl" src={post.link} height={300} width={500} alt="Attached Media for Post" />
                                )}
                            </Link>
                            <div className="mt-1 inline-flex ml-2">
                            <div className="inline-flex w-auto justify-between">
                                <FiHeart className="hover:cursor-pointer text-stone-800" size={20}/>
                                <p className='ml-2'>{post.likes.length}</p>
                            </div>
                            <div className="inline-flex w-auto justify-between">
                                <FiMessageCircle className="hover:cursor-pointer text-stone-800 ml-20" size={20}/>
                                <p className='ml-2'>{post.replies.length}</p>
                            </div>
                            <FiShare className="hover:cursor-pointer text-stone-800 ml-20 align-right" size={20}/>
                            </div>
                        </div> 
                    </div> 
                </div>
            </div>
        )}
    </>
    )
}

export default PostView