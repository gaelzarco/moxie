import type { NextPage } from "next";
import type { ReactNode } from "react";

import { UserNavDropDown } from "./dropdownmenus";

const Header: NextPage<{ children: ReactNode, noNav?: boolean }> = ({ children, noNav }) => {
    
    return (
        <div className={`cursor-default sticky ${ !noNav ? 'top-0 z-10' : '' } backdrop-blur-lg h-[90px] pl-6 w-full inline-flex items-center justify-between`}>
            <div className={`justify-start inline-flex items-center content-center ${ noNav ? 'mt-2' : '' }`}>
                {children}
            </div>

            {!noNav && (
                <div className="inline-flex p-5 pr-6 justify-between">
                    <UserNavDropDown />
                </div>
            )}
        </div>
    )
}

export default Header