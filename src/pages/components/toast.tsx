import type { NextPage } from "next";
import { type ReactNode, useRef } from "react";
import * as ToastPrimitive from '@radix-ui/react-toast';

const ToastComponent: NextPage<{ title: string, content?: string, children: ReactNode }> = ({ title, children }) => {

    const toastDateRef = useRef(new Date())

    return (
        <ToastPrimitive.Provider swipeDirection="right">
            <ToastPrimitive.Root className="p-5 dark:bg-neutral-700/30 backdrop-blur-md rounded-md shadow-lg grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut
            ">
                <ToastPrimitive.Title className="[grid-area:_title] mb-4 font-medium text-black dark:text-white text-md">{title}</ToastPrimitive.Title>
                <ToastPrimitive.Description asChild>
                    <time className="[grid-area:_description] dark:text-neutral-400 text-left m-0 text-sm leading-1" dateTime={toastDateRef.current.toISOString()}>
                        {toastDate(toastDateRef.current)}
                    </time>
                </ToastPrimitive.Description >
                <ToastPrimitive.Action className="[grid-area:_action]" asChild altText="Close">
                    {children}
                </ToastPrimitive.Action >
            </ToastPrimitive.Root>
            <ToastPrimitive.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none"/>
        </ToastPrimitive.Provider>
    )
}

function toastDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);
}

export default ToastComponent;