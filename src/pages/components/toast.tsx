import type { NextPage } from "next";
import { type ReactNode, useRef } from "react";
import * as ToastPrimitive from '@radix-ui/react-toast';

const ToastComponent: NextPage<{ title: string, content?: string, children: ReactNode }> = (
    { title, children } : { title: string, children: ReactNode }) => {

    const toastDateRef = useRef(new Date())

    return (
        <ToastPrimitive.Provider swipeDirection="right">
            <ToastPrimitive.Root className="ToastRoot">
                <ToastPrimitive.Title className="ToastTitle">{title}</ToastPrimitive.Title>
                <ToastPrimitive.Description asChild>
                    <time className="ToastDescription" dateTime={toastDateRef.current.toISOString()}>
                        {toastDate(toastDateRef.current)}
                    </time>
                </ToastPrimitive.Description >
                <ToastPrimitive.Action className="ToastAction" asChild altText="Close">
                    {children}
                </ToastPrimitive.Action >
            </ToastPrimitive.Root>
            <ToastPrimitive.Viewport className="ToastViewport"/>
        </ToastPrimitive.Provider>
    )
}

export function toastDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);
  }

export default ToastComponent;