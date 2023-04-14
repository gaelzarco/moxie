import type { NextPage } from "next";
import type { ReactNode } from "react";
import NavBar from "./navbar";

const Header: NextPage<{ children: ReactNode, noNav?: boolean }> = ({ children, noNav }) => {
    return (
        <div className={`sticky mt-4 ${ !noNav ? 'top-0 z-10 mt-0' : '' } backdrop-blur-lg h-[80px] pl-6 w-full inline-flex items-center justify-between`}>
            <div className="justify-start inline-flex items-center content-center">
                {children}
            </div>

            {!noNav && <NavBar />}
        </div>
    )
}

export default Header