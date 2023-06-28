import { type FormEvent, type MouseEvent, useState, useRef, MutableRefObject, KeyboardEventHandler, KeyboardEvent } from "react"
import type { MutationStatus } from "@tanstack/react-query"
import { api } from "~/utils/api"
import type { RouterOutputs } from "~/utils/api"
import Image from 'next/image'
import Link from 'next/link'

import { SearchOptionsDropDown } from "./dropdownmenus"
import { CrumpledPaperIcon, PaperPlaneIcon } from "@radix-ui/react-icons"
import { Jelly } from "@uiball/loaders"

type UserSearchType = RouterOutputs["search"]["findUser"]
type PostSearchType = RouterOutputs["search"]["findPost"]
type ReplySearchType = RouterOutputs["search"]["findReply"]

export default function SearchBar() {
    const [ searchCategory, setSearchCategory ] = useState<string>("users")
    const [ searchQuery, setSearchQuery ] = useState<string | null>(null)

    const [ userResult, setUserResult ] = useState<UserSearchType | null >(null)
    const [ postResult, setPostResult ] = useState<PostSearchType | null >(null)
    const [ replyResult, setReplyResult ] = useState<ReplySearchType | null >(null)

    const searchBarRef = useRef<HTMLInputElement>(null);

    const setSearchCategoryHandler = (category: string) => {
        setSearchCategory(category)

        setUserResult(null)
        setPostResult(null)
        setReplyResult(null)
        setSearchQuery(null)

        userSearchMutation.reset()
        postSearchMutation.reset()
        replySearchMutation.reset()
    }

    const setSearchQueryHandler = (query: string) => {
        setSearchQuery(query)

        setUserResult(null)
        setPostResult(null)
        setReplyResult(null)

        userSearchMutation.reset()
        postSearchMutation.reset()
        replySearchMutation.reset()
    }
    
    const resetSearchBar = (e: MouseEvent) => {
        e.preventDefault()

        setUserResult(null)
        setPostResult(null)
        setReplyResult(null)
        setSearchQuery(null)

        userSearchMutation.reset()
        postSearchMutation.reset()
        replySearchMutation.reset()
    }

    const userSearchMutation = api.search.findUser.useMutation({
        onSuccess: data => setUserResult(data),
        onError: err => console.log(err),
    })

    const postSearchMutation = api.search.findPost.useMutation({
        onSuccess: data => setPostResult(data),
        onError: err => console.log(err),
    })

    const replySearchMutation = api.search.findReply.useMutation({
        onSuccess: data => setReplyResult(data),
        onError: err => console.log(err),
    })

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
        hideKeyboard();
      }
    };

    const hideKeyboard = () => {
        if (searchBarRef.current) {
          searchBarRef.current.blur();
        }
      };

    const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault()
        if (!searchQuery) return console.log("Search query cannot be empty.")

        if (searchCategory === 'users') userSearchMutation.mutate({ query: searchQuery })
        if (searchCategory === 'posts') postSearchMutation.mutate({ query: searchQuery })
        if (searchCategory === 'replies') replySearchMutation.mutate({ query: searchQuery })
    }

    return (
        <>
            {userResult && searchCategory === 'users' && (
                <UserSearchComponent userResult={userResult} userSearchMutationStatus={userSearchMutation.status} />
            )}

            {postResult && searchCategory === 'posts' && (
                <PostSearchComponent postResult={postResult} postSearchMutationStatus={postSearchMutation.status} />
            )}

            {replyResult && searchCategory === 'replies' && (
                <ReplySearchComponent replyResult={replyResult} replySearchMutationStatus={replySearchMutation.status} />
            )}

            <div className="flex items-center mb-4 mx-4 border border-neutral-700 bg-neutral-900/30 backdrop-blur-2xl rounded-xl text-white">
                <div className="flex flex-row items-center px-2 py-2 mr-2">
                    <SearchOptionsDropDown category={searchCategory} setCategory={setSearchCategoryHandler}/>
                </div>
                <form 
                    className='inline-flex items-center w-full h-full mr-4'
                    onSubmit={handleSubmit}
                >
                    <input
                        ref={searchBarRef}
                        onKeyDown={handleKeyPress}
                        type='text'
                        placeholder='Search'
                        className="w-full h-full py-2 bg-transparent focus-within:outline-none text-md"
                        value={searchQuery || ''}
                        onChange={e => setSearchQueryHandler(e.target.value)}
                    />

                    {(userSearchMutation.isLoading || postSearchMutation.isLoading || replySearchMutation.isLoading) && (
                        <div className="flex items-center self-center mx-2">
                            <Jelly color="white" size={15} />
                        </div>
                    )}

                    <button 
                        className="flex items-center content-center justify-center min-w-[30px] min-h-[30px] bg-neutral-800 rounded-full"
                        onClick={e => resetSearchBar(e as MouseEvent<HTMLButtonElement>)}
                    >
                        <CrumpledPaperIcon />
                    </button>
                </form>
            </div>
        </>
    )
}

function UserSearchComponent({ userResult, userSearchMutationStatus } : {
    userResult: UserSearchType, userSearchMutationStatus: MutationStatus 
    }) {
    return (
        <>
            {!!userResult && userSearchMutationStatus === 'success' && (
                <div className="max-h-[400px] max-lg:max-h-[300px] overflow-y-auto overflow-x-hidden max-md:text-sm flex flex-col mx-4 items-center mb-4 p-2 border border-neutral-700 bg-neutral-900/30 backdrop-blur-2xl rounded-xl text-white">
                    {userResult.length === 0 ? (
                        <h2 className="text-md max-md:text-sm py-8 px-2">User not found</h2>
                    ) : (
                        <h2 className="text-xl max-md:text-lg py-4 px-2 self-start font-bold">Users</h2>
                    )}
                    {userResult.map((user, idx) => {
                        return (
                            <Link href={`/profile/${user.id}`} key={idx} className="flex flex-row p-4 my-1 w-full cursor-pointer rounded-xl border border-neutral-700">
                                <div className="inline-flex items-center rounded-full h-10 w-10 border border-neutral-700">
                                    <Image src={user.profileImageUrl} alt='User Profile' width={100} height={100} className="w-full h-full rounded-full"/>
                                </div>
                                <div className="flex flex-col ml-4">
                                    <p className="text-md max-md:text-sm font-semibold leading-5">{user.firstName}{' '}{user.lastName}</p>
                                    <p className="text-stone-500 text-sm max-md:text-xs">@{!user.username ? 'username' : user.username}</p>
                                </div>
                            </Link> 
                        )
                    })}
                </div>
            )}

            {userSearchMutationStatus === 'error' && (
                <div className="max-h-[400px] overflow-y-auto overflow-x-hidden max-md:text-sm flex flex-col mx-4 items-center mb-4 p-2 border border-neutral-700 bg-neutral-900/30 backdrop-blur-2xl rounded-xl text-white">
                    <p>User Not Found</p>
                </div>
            )}
        </>
    )
}

function PostSearchComponent({ postResult, postSearchMutationStatus } : {
        postResult: PostSearchType, postSearchMutationStatus: MutationStatus
    }) {
    return (
        <>
            {!!postResult && postSearchMutationStatus === 'success' && (
                <div className="max-h-[400px] max-lg:max-h-[300px] overflow-y-auto overflow-x-hidden max-md:text-sm flex flex-col mx-4 items-center mb-4 p-2 border border-neutral-700 bg-neutral-900/30 backdrop-blur-2xl rounded-xl text-white">
                    {postResult.length === 0 ? (
                        <h2 className="text-md max-md:text-sm py-8 px-2">Post not found</h2>
                    ) : (
                        <h2 className="text-xl max-md:text-lg py-4 px-2 self-start font-bold">Posts</h2>
                    )}
                    
                    {Object.values(postResult).map(({ post, user }, idx) => {
                        return (
                            <Link href={`/post/${post.id}`} key={idx} className="flex flex-col p-4 my-1 max-md:pb-6 w-full cursor-pointer rounded-xl border border-neutral-700">
                                <div className="flex flex-row">
                                    <div className="inline-flex items-center rounded-full h-10 w-10 border border-neutral-700">
                                        <Image src={user.profileImageURL} alt='User Profile' width={100} height={100} className="w-full h-full rounded-full"/>
                                    </div>
                                    <div className="flex flex-row items-center text-center ml-4 -mt-2">
                                        <p className="text-md max-md:text-sm font-semibold leading-5">{user.firstName}</p>
                                        <p className="text-stone-500 text-sm max-md:text-xs ml-2">@{user.userName}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col w-full pl-14">
                                    <p>{post.body.length > 60 ? `${post.body.slice(0, 60)}...` : post.body}</p>

                                    {post.media && (
                                        <div className="flex flex-row max-w-[150px] justify-between items-center mt-2">
                                            <p className="text-neutral-500 text-sm max-md:text-xs">Attached Media</p>
                                        </div>
                                    )}
                                    
                                    <div className="flex flex-row max-w-[150px] justify-between items-center mt-4">
                                        <p className="text-neutral-500 text-sm max-md:text-xs">
                                            {post._count.likes > 1 || post._count.likes === 0 ? `${post._count.likes} likes` : `${post._count.likes} like`}
                                        </p>
                                        <p className="text-neutral-500 text-sm max-md:text-xs">
                                            {post._count.replies > 1 || post._count.replies === 0 ? `${post._count.replies} replies` : `${post._count.replies} reply`}
                                        </p>
                                    </div>
                                </div>
                            </Link> 
                        )
                    })}
                </div>
            )}

            {postSearchMutationStatus === 'error' && (
                <div className="max-h-[400px] overflow-y-auto overflow-x-hidden max-md:text-sm flex flex-col mx-4 items-center mb-4 p-2 border border-neutral-700 bg-neutral-900/30 backdrop-blur-2xl rounded-xl text-white">
                    <p>Post Not Found</p>
                </div>
            )}
        </>
    )
}

function ReplySearchComponent({ replyResult, replySearchMutationStatus } : {
        replyResult: ReplySearchType, replySearchMutationStatus: MutationStatus
    }) {
    return (
        <>
            {!!replyResult && replySearchMutationStatus === 'success' && (
                <div className="max-h-[400px] max-lg:max-h-[300px] overflow-y-auto overflow-x-hidden max-md:text-sm flex flex-col mx-4 items-center mb-4 p-2 border border-neutral-700 bg-neutral-900/30 backdrop-blur-2xl rounded-xl text-white">
                    {replyResult.length === 0 ? (
                        <h2 className="text-md max-md:text-sm py-8 px-2">Reply not found</h2>
                    ) : (
                        <h2 className="text-xl max-md:text-lg py-4 px-2 self-start font-bold">Replies</h2>
                    )}
                    
                    {Object.values(replyResult).map(({ reply, user, postUser }, idx) => {
                        return (
                            <Link href={`/post/${reply.postId}`} key={idx} className="flex flex-col p-4 my-1 max-md:pb-6 w-full cursor-pointer rounded-xl border border-neutral-700">
                                <div className="flex flex-row items-center mb-2 ml-1">
                                    <PaperPlaneIcon className="text-neutral-500 w-3 h-3 mr-4" />
                                    <p className="text-neutral-500 text-sm max-md:text-xs">{"In reply to " + `${postUser?.firstName as string}` + "'s post" }</p>
                                    <div className="inline-flex items-center rounded-full h-6 w-6 border border-neutral-700 ml-2">
                                        <Image src={user.profileImageURL} alt='User Profile' width={100} height={100} className="w-full h-full rounded-full"/>
                                    </div>
                                </div>

                                <div className="flex flex-row">
                                    <div className="inline-flex items-center rounded-full h-10 w-10 border border-neutral-700">
                                        <Image src={user.profileImageURL} alt='User Profile' width={100} height={100} className="w-full h-full rounded-full"/>
                                    </div>
                                    <div className="flex flex-row items-center text-center ml-4 -mt-2">
                                        <p className="text-md max-md:text-sm font-semibold leading-5">{user.firstName}</p>
                                        <p className="text-stone-500 text-sm max-md:text-xs ml-2">@{user.userName}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col w-full pl-14">
                                    <p>{reply.body.length > 60 ? `${reply.body.slice(0, 60)}...` : reply.body}</p>

                                    {reply.media && (
                                        <div className="flex flex-row max-w-[150px] justify-between items-center mt-2">
                                            <p className="text-neutral-500 text-sm max-md:text-xs">Attached Media</p>
                                        </div>
                                    )}
                                    
                                    <div className="flex flex-row max-w-[150px] justify-between items-center mt-4">
                                        <p className="text-neutral-500 text-sm max-md:text-xs">
                                            {reply._count.likes > 1 || reply._count.likes === 0 ? `${reply._count.likes} likes` : `${reply._count.likes} like`}
                                        </p>
                                    </div>
                                </div>
                            </Link> 
                        )
                    })}
                </div>
            )}

            {replySearchMutationStatus === 'error' && (
                <div className="max-h-[400px] overflow-y-auto overflow-x-hidden max-md:text-sm flex flex-col mx-4 items-center mb-4 p-2 border border-neutral-700 bg-neutral-900/30 backdrop-blur-2xl rounded-xl text-white">
                    <p>Reply Not Found</p>
                </div>
            )}
        </>
    )
}