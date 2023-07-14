import type { NextPage } from "next";
import type { ReactNode } from "react";
import { useTheme } from "next-themes";

import { UserNavDropDown } from "./dropdownmenus";
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

const Header: NextPage<{ children: ReactNode, noNav?: boolean }> = ({ children, noNav }) => {
    const { theme, setTheme } = useTheme()

    function toggleTheme() {
        if (theme === 'light') setTheme('dark')
        else setTheme('light')
      }
    
    return (
        <div className={`cursor-default sticky ${ !noNav ? 'top-0 z-10' : '' } backdrop-blur-lg h-[90px] pl-6 w-full inline-flex items-center justify-between`}>
            <div className={`justify-start inline-flex items-center content-center ${ noNav ? 'mt-2' : '' }`}>
                {children}
            </div>

            {!noNav && (
                <div className="inline-flex items-center p-5 pr-6 justify-between">
                    <button
                        className='flex items-center justify-center text-orange-600 dark:text-yellow-200 w-12 h-12 mr-2 bg-neutral-300/40 hover:bg-neutral-400/40 dark:bg-neutral-900/50 dark:hover:bg-neutral-800/50 rounded-full hover:cursor-pointer'
                        onClick={toggleTheme}
                        >
                        {theme === 'light' ? <SunIcon className="w-4 h-4"/> : <MoonIcon className="w-4 h-4"/>}
                    </button>
                    <UserNavDropDown />
                </div>
            )}
        </div>
    )
}

export default Header