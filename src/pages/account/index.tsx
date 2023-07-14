import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { UserProfile } from "@clerk/nextjs";
import { useTheme } from "next-themes";

import Header from "../components/header";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { Jelly } from "@uiball/loaders";
import { customFont } from "../_app"

const Account: NextPage = () => {

    const router = useRouter()
    const [ loading, setLoading ] = useState(false)
    const { theme } = useTheme()

    return (
        <div className="absolute top-0 bottom-10 left-0 right-0 cursor-default min-h-screen h-[1620px] w-screen dark:bg-black rounded-xl content-center flex ">
            <div className="mx-auto">
                <Header noNav>
                    <CaretLeftIcon className="dark:text-white h-6 w-6 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full hover:cursor-pointer"
                        onClick={() => {
                            setLoading(true)
                            router.push('/')
                            .catch((err) => console.log(err))
                        }}
                    />
                    <h2 className="ml-5 text-2xl font-bold">
                        Account Settings
                    </h2>

                    <span className="flex flex-row content-center justify-center ml-5 text-neutral-400">
                        {loading && theme === 'dark' && <Jelly color='white' size={15}/>}
                        {loading && theme === 'light' && <Jelly color='black' size={15}/>}
                    </span>
                </Header>

                <UserProfile appearance={{ 
                    elements: {
                        navbar: `${customFont.variable} font-sans bg-neutral-200 dark:bg-neutral-900 rounded-xl`,
                        scrollBox: `${customFont.variable} font-sans bg-neutral-200 dark:bg-neutral-900`,
                        userButtonPopoverCard: `${customFont.variable} font-sans bg-neutral-200 dark:bg-neutral-900`,
                        card: `${customFont.variable} font-sans bg-neutral-200 dark:bg-neutral-900 rounded-xl`,
                    },
                    variables: {
                        fontFamily: `${customFont.variable} font-sans`,
                        colorText: `${theme === 'dark' ? 'white' : 'black'}`,
                        colorTextOnPrimaryBackground: 'white',
                        colorTextSecondary: 'gray'
                    }
                }}/>
            </div>
        </div>
    )
  }

export default Account