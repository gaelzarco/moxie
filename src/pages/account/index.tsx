import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { UserProfile } from "@clerk/nextjs";

import Header from "../components/header";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { Jelly } from "@uiball/loaders";
import { customFont } from "../_app"

const Account: NextPage = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)

    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 cursor-default min-h-screen h-[1620px] w-screen bg-black rounded-xl content-center flex ">
            <div className="mx-auto">
            <Header noNav>
                    <CaretLeftIcon className="dark:text-white hover:cursor-pointer h-6 w-6"
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
                        {loading && <Jelly color='white' size={15}/>}
                    </span>
                </Header>

            <UserProfile appearance={{ 
            elements: {
                navbar: `${customFont.variable} font-sans text-white bg-neutral-900 rounded-xl`,
                scrollBox: `${customFont.variable} font-sans text-white bg-neutral-900`,
                userButtonPopoverCard: `${customFont.variable} font-sans text-white bg-neutral-900`,
                card: `${customFont.variable} font-sans text-white bg-neutral-900 rounded-xl`,
            },
            variables: {
                fontFamily: `${customFont.variable} font-sans`,
                colorText: 'white',
                colorTextOnPrimaryBackground: 'white',
                colorTextSecondary: 'gray'
            }
            }}/>
            </div>
        </div>
    )
  }

export default Account