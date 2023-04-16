import type { NextPage } from "next";
import { useRef } from "react";
import { useRouter } from "next/router";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type RouterInputs, api } from "~/utils/api";
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import Image from "next/image";

import Toast from "./toast";
import { PersonIcon, DotsHorizontalIcon, Pencil2Icon, CrumpledPaperIcon, EnterIcon, ExitIcon, GearIcon } from '@radix-ui/react-icons';
import { customFont } from "../_app";
import Link from "next/link";

type PostAndReplyDelete = {
    postId: RouterInputs["posts"]["deleteOneById"]
    replyId?: RouterInputs["replies"]["deleteOneById"]
    postType: "POST" | "REPLY"
    deleteType: "FEED" | "POST" | "REPLY"
}

const PostOptionsDropDown: NextPage< PostAndReplyDelete > = ({ postId, replyId, postType, deleteType }) => {

    const context = api.useContext();
    const router = useRouter();
    const toastRef = useRef<{ publish: () => void }>()

    const postDelete = api.posts.deleteOneById.useMutation({
        onSuccess: () => {
            router.back()
        },
    })
    const postsDelete = api.posts.deleteOneById.useMutation({
        onSuccess: async () => {
            toastRef.current?.publish()
            await context.posts.getAll.refetch()
            .catch(err => console.log(err));
        },
    })
    const repliesDelete = api.replies.deleteOneById.useMutation({
        onSuccess: async () => {
            toastRef.current?.publish()
            await context.replies.getAllByPostId.refetch(postId)
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
        } else {
            throw new Error('Post type could not be determined.');
        }
    };

    return (
        <DropdownMenuPrimitive.Root>

        <Toast forwardedRef={toastRef} title={`${replyId ? 'Reply' : 'Post'}` + ' deleted successfully!'} /> 

        <DropdownMenuPrimitive.Trigger asChild>
            <button
            className="w-[20px] h-[10px] inline-flex items-center justify-end mr-1 outline-none"
            aria-label="Customise options"
            >
            <DotsHorizontalIcon />
            </button>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>

            <DropdownMenuPrimitive.Content
            className={`${customFont.variable} font-sans min-w-[150px] backdrop-blur-lg dark:bg-neutral-700/30 rounded-lg p-[5px] shadow-xl data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade`}
            sideOffset={5}>

            <DropdownMenuPrimitive.Item className='group leading-none rounded-lg flex items-center h-[35px] px-[5px] relative pl-[15px] select-none outline-none data-[disabled] data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-500/10 data-[highlighted]:text-neutral-100'>
                Edit{' '}(coming soon)
                <div className="ml-auto pl-[20px] group-data-[highlighted]:text-neutral-100 group-data-[disabled]">
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

            <DropdownMenuPrimitive.Arrow className="backdrop-blur-md fill-neutral-700/30" />
            </DropdownMenuPrimitive.Content>

        </DropdownMenuPrimitive.Portal>

        </DropdownMenuPrimitive.Root>
    );
};

export const UserNavDropDown: NextPage = () => {

    const { isSignedIn, user } = useUser()
    const router = useRouter()

    return (
        <DropdownMenuPrimitive.Root>

        <DropdownMenuPrimitive.Trigger asChild>
            {(!!isSignedIn && !!user) ? (
            <div className="inline-flex items-center">
                    <Image src={user.profileImageUrl} width={45} height={45} className="rounded-full mr-0 hover:cursor-pointer bg-neutral-800" alt='user avatar' />
            </div>
            ) : (
                <div className="inline-flex items-center">
                    <PersonIcon className="rounded-full mr-0 hover:cursor-pointer w-12 h-12 bg-neutral-800 p-3"/>
                </div>
            )}
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>

            <DropdownMenuPrimitive.Content
            className={`${customFont.variable} font-sans z-20 min-w-[150px] backdrop-blur-lg dark:bg-neutral-700/30 rounded-lg p-[5px] shadow-xl data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade`}
            sideOffset={5}>

            {!isSignedIn && (
            <DropdownMenuPrimitive.Item className='group leading-none rounded-lg flex items-center h-[35px] px-[5px] relative pl-[15px] select-none outline-none data-[disabled] data-[disabled]:pointer-events-none hover:bg-neutral-400/10 text-neutral-100 hover:cursor-pointer'>
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

                <DropdownMenuPrimitive.Item className='group leading-none rounded-lg flex items-center h-[35px] px-[5px] relative pl-[15px] select-none outline-none data-[disabled] data-[disabled]:pointer-events-none hover:bg-neutral-400/10 text-neutral-100'>
                    <Link href={`/user/${user.id}`} className="justify-between flex flex-row w-full hover:cursor-pointer">
                        <p>Profile</p>
                        <PersonIcon /> 
                    </Link>
                </DropdownMenuPrimitive.Item>

                <DropdownMenuPrimitive.Item className='group leading-none rounded-lg flex items-center h-[35px] px-[5px] relative pl-[15px] select-none outline-none data-[disabled] data-[disabled]:pointer-events-none hover:bg-neutral-400/10 text-neutral-100'>
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

            <DropdownMenuPrimitive.Arrow className="backdrop-blur-md fill-neutral-700/30" />
            </DropdownMenuPrimitive.Content>

        </DropdownMenuPrimitive.Portal>

        </DropdownMenuPrimitive.Root>
    );
};

export default PostOptionsDropDown
