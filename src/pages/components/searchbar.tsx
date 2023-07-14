import { type FormEvent, type MouseEvent, type KeyboardEvent, useState, useRef } from "react"
import type { MutationStatus } from "@tanstack/react-query"
import { api } from "~/utils/api"
import type { RouterOutputs } from "~/utils/api"
import { useTheme } from "next-themes"
import Image from 'next/image'
import Link from 'next/link'

import Toast from "./toast"
import { SearchOptionsDropDown } from "./dropdownmenus"
import { CrumpledPaperIcon, MagnifyingGlassIcon, PaperPlaneIcon } from "@radix-ui/react-icons"
import { Jelly } from "@uiball/loaders"

type UserSearchType = RouterOutputs["search"]["findUser"]
type PostSearchType = RouterOutputs["search"]["findPost"]
type ReplySearchType = RouterOutputs["search"]["findReply"]

export default function SearchBar() {
    const [ searchCategory, setSearchCategory ] = useState<string>("users")
    const [ searchQuery, setSearchQuery ] = useState<string | null>(null)
    const [ errMsg, setErrMsg ] = useState<string | null>(null)

    const [ userResult, setUserResult ] = useState<UserSearchType | null >(null)
    const [ postResult, setPostResult ] = useState<PostSearchType | null >(null)
    const [ replyResult, setReplyResult ] = useState<ReplySearchType | null >(null)

    const failedToastRef = useRef<{ publish: () => void }>()
    const searchBarRef = useRef<HTMLInputElement>(null);

    const { theme } = useTheme()

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
        onSuccess: data => {
            if (data.length === 0) {
                setErrMsg('No users found')
                failedToastRef.current?.publish()
            }
            setUserResult(data)
        },
        onError: err => {
            setErrMsg(err.message)
            failedToastRef.current?.publish()
            return
        },
    })

    const postSearchMutation = api.search.findPost.useMutation({
        onSuccess: data => {
            if (data.length === 0) {
                setErrMsg('No posts found')
                failedToastRef.current?.publish()
            }
            setPostResult(data)
        },
        onError: err => {
            setErrMsg(err.message)
            failedToastRef.current
            return
        },
    })

    const replySearchMutation = api.search.findReply.useMutation({
        onSuccess: data => {
            if (data.length === 0) {
                setErrMsg('No replies found')
                failedToastRef.current?.publish()
            }
            setReplyResult(data)
        },
        onError: err => {
            setErrMsg(err.message)
            failedToastRef.current
            return
        },
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
        if (!searchQuery) {
            setErrMsg('Search query cannot be empty')
            failedToastRef.current?.publish()
            return
        }

        if (searchCategory === 'users') userSearchMutation.mutate({ query: searchQuery })
        if (searchCategory === 'posts') postSearchMutation.mutate({ query: searchQuery })
        if (searchCategory === 'replies') replySearchMutation.mutate({ query: searchQuery })
    }

    return (
        <>
            <Toast forwardedRef={failedToastRef} title={errMsg as string} error />

            <div className="shadow-xl dark:shadow-none flex items-center w-11/12 mx-auto bg-neutral-100 dark:bg-neutral-900 backdrop-blur-2xl rounded-xl text-white">
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
                        className="w-full h-full py-2 pr-2 bg-transparent focus-within:outline-none text-md text-black dark:text-white"
                        value={searchQuery || ''}
                        onChange={e => setSearchQueryHandler(e.target.value)}
                    />

                    {(userSearchMutation.isLoading || postSearchMutation.isLoading || replySearchMutation.isLoading) && (
                        <div className="flex items-center self-center mr-3 dark:text-white text-black bg-transparent">
                            {theme === 'dark' ? <Jelly size={15} color='#fff' /> : <Jelly size={15} color='#000' />}
                        </div>
                    )}

                    <button
                        type='submit'
                        className="flex items-center content-center justify-center min-w-[30px] min-h-[30px] text-black dark:text-white bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full mr-2"
                    >
                        <MagnifyingGlassIcon />
                    </button>

                    <button 
                        className="flex items-center content-center justify-center min-w-[30px] min-h-[30px] text-black dark:text-white bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full"
                        onClick={e => resetSearchBar(e as MouseEvent<HTMLButtonElement>)}
                    >
                        <CrumpledPaperIcon />
                    </button>
                </form>
            </div>

            {userResult && searchCategory === 'users' &&
                <UserSearchComponent userResult={userResult} userSearchMutationStatus={userSearchMutation.status} />
            }

            {postResult && searchCategory === 'posts' &&
                <PostSearchComponent postResult={postResult} postSearchMutationStatus={postSearchMutation.status} />
            }

            {replyResult && searchCategory === 'replies' && 
                <ReplySearchComponent replyResult={replyResult} replySearchMutationStatus={replySearchMutation.status} />
            }
        </>
    )
}

function UserSearchComponent({ userResult, userSearchMutationStatus } : {
    userResult: UserSearchType, userSearchMutationStatus: MutationStatus 
    }) {
    return (
        <>
            {userResult.length > 1 && userSearchMutationStatus === 'success' && (
                <div className="shadow-xl dark:shadow-none max-h-[400px] max-lg:max-h-[300px] overflow-y-auto overflow-x-hidden max-md:text-sm flex flex-col mx-8 mt-4 items-center p-2 bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white bg-transparent rounded-xl">
                    {userResult.map((user, idx) => {
                        return (
                            <Link href={`/profile/${user.id}`} key={idx} className="flex flex-row p-4 my-1 w-full cursor-pointer rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700">
                                <div className="inline-flex items-center rounded-full h-10 w-10 border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900">
                                    <Image src={user.profileImageUrl} alt='User Profile' width={100} height={100} className="w-full h-full rounded-full"/>
                                </div>
                                <div className="flex flex-col ml-4 -mt-1">
                                    <p className="text-md max-md:text-sm font-semibold leading-8 text-black dark:text-white ">{user.firstName}{' '}{user.lastName}</p>
                                    <p className="text-neutral-500 dark:text-neutral-400 text-sm max-md:text-xs">@{!user.username ? 'username' : user.username}</p>
                                </div>
                            </Link> 
                        )
                    })}
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
            {postResult.length > 0 && postSearchMutationStatus === 'success' && (
                <div className="shadow-xl dark:shadow-none max-h-[400px] max-lg:max-h-[300px] overflow-y-auto overflow-x-hidden max-md:text-sm flex flex-col mx-8 mt-4 items-center p-2 bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white bg-transparent rounded-xl">
                    {Object.values(postResult).map(({ post, user }, idx) => {
                        return (
                            <Link href={`/post/${post.id}`} key={idx} className="flex flex-col p-4 my-1 max-md:pb-6 w-full cursor-pointer rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700">
                                <div className="flex flex-row">
                                    <div className="inline-flex items-center rounded-full h-10 w-10 border border-neutral-700">
                                        <Image src={user.profileImageURL} alt='User Profile' width={100} height={100} className="w-full h-full rounded-full"/>
                                    </div>
                                    <div className="flex flex-row items-center text-center ml-4 -mt-2">
                                        <p className="text-md max-md:text-sm font-semibold leading-5">{user.firstName}</p>
                                        <p className="text-neutral-500 dark:text-neutral-400 text-sm max-md:text-xs ml-2">@{user.userName}</p>
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
        </>
    )
}

function ReplySearchComponent({ replyResult, replySearchMutationStatus } : {
        replyResult: ReplySearchType, replySearchMutationStatus: MutationStatus
    }) {
    return (
        <>
            {replyResult.length > 0 && replySearchMutationStatus === 'success' && (
                <div className="shadow-xl dark:shadow-none max-h-[400px] max-lg:max-h-[300px] overflow-y-auto overflow-x-hidden max-md:text-sm flex flex-col mx-8 mt-4 items-center p-2 bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white bg-transparent rounded-xl">
                    {Object.values(replyResult).map(({ reply, user, postUser }, idx) => {
                        return (
                            <Link href={`/post/${reply.postId}`} key={idx} className="flex flex-col p-4 my-1 max-md:pb-6 w-full cursor-pointer rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700">
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
                                        <p className="text-neutral-500 dark:text-neutral-400 text-sm max-md:text-xs ml-2">@{user.userName}</p>
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
        </>
    )
}