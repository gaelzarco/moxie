import {
     type ForwardRefExoticComponent, type MutableRefObject,
     forwardRef, useRef, useState, useImperativeHandle }
 from "react";
import * as ToastPrimitive from '@radix-ui/react-toast';

const Toast: ForwardRefExoticComponent<{ title: string, forwardedRef: MutableRefObject<{ publish: () => void } | undefined >, error?: boolean }> = forwardRef(
    ({ title, forwardedRef, error }) => {

    const [ count, setCount ] = useState(0)
    const toastDateRef = useRef(new Date())

    useImperativeHandle(forwardedRef, () => ({
        publish : () => setCount(count => count + 1)
    }));

    return (
        <ToastPrimitive.Provider swipeDirection="right">
            
        {Array.from({ length: count }).map((_, index) => (
            <ToastPrimitive.Root key={index} duration={3000}
                className="p-5 dark:bg-neutral-700/30 backdrop-blur-lg rounded-xl shadow-lg grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
                >

                <ToastPrimitive.Title className="[grid-area:_title] mb-4 font-medium text-black dark:text-white text-md">{title}</ToastPrimitive.Title>

                <ToastPrimitive.Description asChild>
                    <time className="[grid-area:_description] dark:text-neutral-400 text-left text-sm leading-0" dateTime={toastDateRef.current.toISOString()}>
                        {toastDate(toastDateRef.current)}
                    </time>
                </ToastPrimitive.Description >

                {error ? (
                    <ToastPrimitive.Close className="[grid-area:_action]" asChild>
                        <button className="font-semibold px-4 h-8 bg-red-500 text-white shadow-md hover:bg-red-600 rounded-full">
                            Close
                        </button>
                    </ToastPrimitive.Close >
                ) : (
                    <ToastPrimitive.Close className="[grid-area:_action]" asChild>
                        <button className="font-semibold px-4 h-8 bg-green-400 text-white shadow-md hover:bg-green-500 rounded-full">
                            Close
                        </button>
                    </ToastPrimitive.Close >
                )}

            </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="[--viewport-padding:_20px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none"/>

        </ToastPrimitive.Provider>
    )
})

function toastDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);
}

Toast.displayName = 'Toast';

export default Toast;