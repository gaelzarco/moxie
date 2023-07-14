import { useRef } from "react";
import { useRouter } from "next/router";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type RouterInputs, api } from "~/utils/api";
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import Image from "next/image";

import Toast from "./toast";
import { PersonIcon, DotsHorizontalIcon, Pencil2Icon, CrumpledPaperIcon, EnterIcon, ExitIcon, GearIcon, CaretDownIcon } from '@radix-ui/react-icons';
import { customFont } from "../_app";
import Link from "next/link";

type PostAndReplyDelete = {
    postId?: RouterInputs["posts"]["deleteOneById"]
    replyId?: RouterInputs["replies"]["deleteOneById"]
    userId?: RouterInputs["users"]["getOneById"]
    postType: "POST" | "REPLY"
    deleteType: "FEED" | "POST" | "REPLY" | "PROFILE"
}

const PostOptionsDropDown: React.FC< PostAndReplyDelete > = ({ postId, replyId, userId, postType, deleteType }) => {
    const context = api.useContext();
    const router = useRouter();
    const failedToastRef = useRef<{ publish: () => void }>()

    const postDelete = api.posts.deleteOneById.useMutation({
        onSuccess: () => {
            router.back()
        },
    })
    const postsDelete = api.posts.deleteOneById.useMutation({
        onSuccess: async () => {
            await context.posts.getAll.refetch()
            .catch(err => console.log(err));
        },
    })
    const repliesDelete = api.replies.deleteOneById.useMutation({
        onSuccess: async () => {
            await context.replies.getAllByPostId.refetch(postId)
            .catch(err => console.log(err));
        }
    })
    const profilePostDelete = api.posts.deleteOneById.useMutation({
        onSuccess: async () => {
            await context.posts.getAllByUserId.refetch(userId)
            .catch(err => console.log(err));
        }
    })
    const profileReplyDelete = api.replies.deleteOneById.useMutation({
        onSuccess: async () => {
            await context.replies.getAllByUserId.refetch(userId)
            .catch(err => console.log(err));
        }
    })

    const deleteHandler = () => {
        if (postType === 'POST' && deleteType === 'POST' && postId) {
            postDelete.mutate(postId);
        } else if (postType === 'POST' && deleteType === 'FEED' && postId) {
            postsDelete.mutate(postId)
        } else if (postType === 'REPLY' && deleteType==='REPLY'&& postId && replyId) {
            repliesDelete.mutate(replyId);
        } else if (postType === 'POST' && deleteType==='PROFILE'&& userId && postId) {
            profilePostDelete.mutate(postId);
        } else if (postType === 'REPLY' && deleteType==='PROFILE'&& userId && replyId) {
            profileReplyDelete.mutate(replyId);
        } else {
            failedToastRef.current?.publish()
        }
    };

    return (
        <DropdownMenuPrimitive.Root>

        <Toast forwardedRef={failedToastRef} title={`${replyId ? 'Reply' : 'Post'}` + ' could not be deleted.'} error />

        <DropdownMenuPrimitive.Trigger asChild>
            <button
            className="w-[30px] h-[20px] inline-flex items-center justify-center outline-none rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 hover:dark:bg-neutral-700"
            aria-label="Customise options"
            >
            <DotsHorizontalIcon />
            </button>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>

            <DropdownMenuPrimitive.Content
            className={`${customFont.variable} font-sans min-w-[150px] backdrop-blur-lg dark:bg-neutral-700/30 rounded-lg p-[5px] shadow-xl data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade`}
            sideOffset={5}>

            <DropdownMenuPrimitive.Item className='group leading-none rounded-lg flex items-center h-[35px] px-[5px] relative pl-[15px] select-none outline-none data-[disabled] data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-500/10 dark:data-[highlighted]:text-neutral-100'>
                Edit{' '}(coming soon)
                <div className="ml-auto pl-[20px] dark:group-data-[highlighted]:text-neutral-100 group-data-[disabled]">
                <Pencil2Icon /> 
                </div>
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item 
                onClick={() => {
                    deleteHandler()
                }}
                className='group leading-none rounded-lg flex items-center h-[35px] px-[5px] relative pl-[15px] select-none outline-none data-[disabled] data-[disabled]:pointer-events-none hover:bg-red-400/10 text-red-400'
            >
                Delete{' '}
                <div className="ml-auto pl-[20px] text-red-400 group-data-[disabled]">
                <CrumpledPaperIcon />
                </div>
            </DropdownMenuPrimitive.Item>

            <DropdownMenuPrimitive.Arrow className="backdrop-blur-md fill-neutral-100/30 dark:fill-neutral-700/30" />
            </DropdownMenuPrimitive.Content>

        </DropdownMenuPrimitive.Portal>

        </DropdownMenuPrimitive.Root>
    );
};

export const UserNavDropDown: React.FC = () => {

    const { isSignedIn, user } = useUser()
    const router = useRouter()

    return (
        <DropdownMenuPrimitive.Root>

        <DropdownMenuPrimitive.Trigger asChild>
            {(!!isSignedIn && !!user) ? (
            <div className="inline-flex items-center">
                    <Image priority src={user.profileImageUrl} width={45} height={45} className="w-12 h-12 rounded-full mr-0 hover:cursor-pointer bg-neutral-200 dark:bg-neutral-800" alt='user avatar' />
            </div>
            ) : (
                <div className="inline-flex items-center">
                    <PersonIcon className="rounded-full mr-0 hover:cursor-pointer w-12 h-12 bg-neutral-200 dark:bg-neutral-800 p-3"/>
                </div>
            )}
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>

            <DropdownMenuPrimitive.Content
            className={`${customFont.variable} font-sans z-20 min-w-[150px] backdrop-blur-lg dark:bg-neutral-700/30 rounded-lg p-[5px] shadow-xl data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade`}
            sideOffset={5}>

            {!isSignedIn && (
            <DropdownMenuPrimitive.Item className='group leading-none rounded-lg flex items-center h-[35px] px-[5px] relative pl-[15px] select-none outline-none data-[disabled] data-[disabled]:pointer-events-none hover:bg-neutral-400/10 dark:text-neutral-100 hover:cursor-pointer'>
                <SignInButton>
                    <div className="justify-between flex flex-row w-full">
                        <p>Sign-In</p>
                        <EnterIcon /> 
                    </div>
                </SignInButton>
            </DropdownMenuPrimitive.Item>    
            )}

            {(!!isSignedIn && !!user) && (
            <>

                <DropdownMenuPrimitive.Item className='group leading-none rounded-lg flex items-center h-[35px] px-[5px] relative pl-[15px] select-none outline-none data-[disabled] data-[disabled]:pointer-events-none hover:bg-neutral-400/10 dark:text-neutral-100 hover:cursor-pointer'>
                    <Link href={`/profile/${user.id}`} className="justify-between flex flex-row w-full hover:cursor-pointer">
                        <p>Profile</p>
                        <PersonIcon /> 
                    </Link>
                </DropdownMenuPrimitive.Item>

                <DropdownMenuPrimitive.Item className='group leading-none rounded-lg flex items-center h-[35px] px-[5px] relative pl-[15px] select-none outline-none data-[disabled] data-[disabled]:pointer-events-none hover:bg-neutral-400/10 dark:text-neutral-100 hover:cursor-pointer'>
                    <Link href='/account' className="justify-between flex flex-row w-full hover:cursor-pointer">
                        <p>Account</p>
                        <GearIcon /> 
                    </Link>
                </DropdownMenuPrimitive.Item>

                <DropdownMenuPrimitive.Item className='group leading-none rounded-lg flex items-center h-[35px] px-[5px] relative pl-[15px] select-none outline-none data-[disabled] data-[disabled]:pointer-events-none hover:bg-red-400/10 text-red-400'>
                    <SignOutButton signOutCallback={router.reload}>
                        <div className="justify-between flex flex-row w-full hover:cursor-pointer">
                            <p>Sign-Out</p>
                            <ExitIcon /> 
                        </div>
                    </SignOutButton>
                </DropdownMenuPrimitive.Item>
            </>
            )}

            <DropdownMenuPrimitive.Arrow className="backdrop-blur-md fill-neutral-100/30 dark:fill-neutral-700/30" />
            </DropdownMenuPrimitive.Content>

        </DropdownMenuPrimitive.Portal>

        </DropdownMenuPrimitive.Root>
    );
};

const SearchOptionsItems: React.FC<{ category: string, setCategory: (category: string) => void }> = ({ category, setCategory }) => {
    return (
        <DropdownMenuPrimitive.Item className='group leading-none rounded-lg flex items-center h-[35px] px-[5px] relative pl-[15px] select-none outline-none data-[disabled] data-[disabled]:pointer-events-none hover:bg-neutral-400/10 dark:text-neutral-100 hover:cursor-pointer'
            onClick={() => setCategory(category)}
        >
            {category.charAt(0).toUpperCase() + category.slice(1)}
        </DropdownMenuPrimitive.Item>
    )
}

export const SearchOptionsDropDown: React.FC<{ category: string, setCategory: (category: string) => void }> = ({ category, setCategory }) => {

    return (
        <DropdownMenuPrimitive.Root>

            <DropdownMenuPrimitive.Trigger asChild>
                <button className="inline-flex p-2 items-center focus-within:outline-none text-md text-black dark:text-white bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-full px-4" >
                    <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
                    <CaretDownIcon className="h-4 w-4 ml-2"/>
                </button>
            </DropdownMenuPrimitive.Trigger>

            <DropdownMenuPrimitive.Portal>

                <DropdownMenuPrimitive.Content
                className={`${customFont.variable} font-sans min-w-[150px] backdrop-blur-lg bg-neutral-100/30 dark:bg-neutral-700/30 rounded-lg p-[5px] shadow-xl data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade`}
                sideOffset={5}>

                <SearchOptionsItems key={"users"} category={'users'} setCategory={setCategory}/>
                <SearchOptionsItems key={"posts"} category={'posts'} setCategory={setCategory}/>
                <SearchOptionsItems key={"replies"} category={'replies'} setCategory={setCategory}/>

                <DropdownMenuPrimitive.Arrow className="backdrop-blur-lg fill-neutral-100/30 dark:fill-neutral-700/30" />
                </DropdownMenuPrimitive.Content>

            </DropdownMenuPrimitive.Portal>

        </DropdownMenuPrimitive.Root>
    );
};

export default PostOptionsDropDown
