import type { NextPage } from "next";
import { useState } from "react";
import { type RouterInputs, api } from "~/utils/api";
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import Toast from "./toast";
import { DotsHorizontalIcon, Pencil2Icon, CrumpledPaperIcon } from '@radix-ui/react-icons';
import { jakartaSans } from "../_app";

type PostAndReplyDelete = {
    postId: RouterInputs["posts"]["deleteOneById"]
    replyId?: RouterInputs["replies"]["deleteOneById"]
    postType: "POST" | "REPLY"
    deleteType: "FEED" | "POST" | "REPLY"
}

const DropDownMenu: NextPage< PostAndReplyDelete > = ({ postId, replyId, postType, deleteType }) => {

    const context = api.useContext();

    const [ toastBool, setToastBool ] = useState(false)

    const toastHandler = () => {
        setToastBool(true)

        setTimeout(() => {
          setToastBool(false)
        }, 4000)
    }

    const postDelete = api.posts.deleteOneById.useMutation({
        onSuccess: async () => {
            toastHandler()
            await context.posts.getOneById.refetch(postId)
            .catch(err => console.log(err));
        },
    })
    const postsDelete = api.posts.deleteOneById.useMutation({
        onSuccess: async () => {
            toastHandler()
            await context.posts.getAll.refetch()
            .catch(err => console.log(err));
        }
    })
    const repliesDelete = api.replies.deleteOneById.useMutation({
        onSuccess: async () => {
            toastHandler()
            await context.replies.getAllByPostId.refetch(postId)
            .catch(err => console.log(err));
        }
    })

    const deleteHandler = () => {
        if (postType === 'POST' && deleteType === 'POST' && postId) {
            postDelete.mutate(postId);
        } else if (postType === 'POST' && deleteType === 'FEED' && postId) {
            postsDelete.mutate(postId);
        } else if (postType === 'REPLY' && deleteType==='REPLY'&& postId && replyId) {
            repliesDelete.mutate(replyId);
        } else {
            throw new Error('Post type could not be determined.');
        }
    };

    return (
        <DropdownMenuPrimitive.Root>

        { toastBool ? (
        <Toast title='Post successfully deleted!' activateToast /> 
        ) : null }

        <DropdownMenuPrimitive.Trigger asChild>
            <button
            className="rounded-full w-[35px] h-[20px] bg-neutral-900 inline-flex items-center justify-center shadow-[0px_0px_10px] outline-none"
            aria-label="Customise options"
            >
            <DotsHorizontalIcon />
            </button>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>

            <DropdownMenuPrimitive.Content
            className={`${jakartaSans.variable} font-sans min-w-[150px] backdrop-blur-md dark:bg-neutral-700/30 rounded-md p-[5px] shadow-xl data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade`}
            sideOffset={5}>

            <DropdownMenuPrimitive.Item className='group leading-none rounded-md flex items-center h-[25px] px-[5px] relative pl-[15px] select-none outline-none data-[disabled] data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-500 data-[highlighted]:text-neutral-100'>
                Edit{' '}
                <div className="ml-auto pl-[20px] group-data-[highlighted]:text-neutral-100 group-data-[disabled]">
                <Pencil2Icon /> 
                </div>
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item 
                onClick={() => {
                    deleteHandler()
                }}
                className='group leading-none rounded-md flex items-center h-[25px] px-[5px] relative pl-[15px] select-none outline-none data-[disabled] data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-500 data-[highlighted]:text-neutral-100'
            >
                Delete{' '}
                <div className="ml-auto pl-[20px] group-data-[highlighted]:text-neutral-100 group-data-[disabled]">
                <CrumpledPaperIcon />
                </div>
            </DropdownMenuPrimitive.Item>

            <DropdownMenuPrimitive.Arrow className="backdrop-blur-md fill-neutral-700/30" />
            </DropdownMenuPrimitive.Content>

        </DropdownMenuPrimitive.Portal>

        </DropdownMenuPrimitive.Root>
    );
};

export default DropDownMenu;
