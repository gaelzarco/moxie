import type { NextPage } from 'next'
import Image from "next/image";
// import Link from "next/link";
import type { RouterOutputs } from "~/utils/api";
import { FiShare, FiMoreHorizontal } from 'react-icons/fi'
import CreateLike from "./createlike";

type RepliesWithUsersAndImages = RouterOutputs["replies"]["getAllByPostId"]

const RepliesView: NextPage<RepliesWithUsersAndImages> = ( data : RepliesWithUsersAndImages ) => {
    
    return (
        <>
        {!!data && (Object.values(data).map(({ reply, user }) => {
            return (
                <div key={reply.id} className="m-auto text-left border-b border-stone-300 w-full min-w-full p-4 cursor-default">
                    <div className="flex leading-none">
                        <Image className="rounded-full w-10 h-10" src={user.profileImageURL} height={50} width={50} alt="Profile Picture" />
                        <div className="pl-2 mb-1 w-full">
                            <div className="inline-flex mb-6 w-full justify-between">
                            <div className="inline-flex items-center">
                                <p className="pl-2 font-medium">{user.firstName}</p>
                                <p className="text-stone-500 text-md hover:cursor-pointer pl-2">@{user.userName === null ? 'username' : user.userName}</p>
                            </div>
                            <FiMoreHorizontal className="text-stone-500 hover:cursor-pointer" size={22}/>
                            </div>
                            <h4 className="pl-2 mb-6">{reply.body}</h4>
                            {reply.link && (
                                <Image className="h-auto w-full min-w-full mb-4 rounded-3xl" src={reply.link} height={300} width={500} alt="Attached Media for Post" />
                            )}
                            <div className="mt-1 inline-flex ml-2">
                                <div className="inline-flex w-auto justify-between">
                                    <CreateLike 
                                        postId={reply.postId} 
                                        replyId={reply.id} 
                                        postType="REPLY" 
                                        likeType='REPLY' 
                                        liked={reply.likes.find((like) => like.userId === user.id) ? true : false}
                                    />
                                    <p className='ml-2'>{reply.likes.length}</p>
                                </div>
                                <FiShare className="hover:cursor-pointer text-stone-800 ml-20 align-right" size={20}/>
                            </div>
                        </div> 
                    </div> 
                </div>
              )
          }))}
        </>
    )
}

export default RepliesView;