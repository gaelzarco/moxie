import type { NextPage } from "next";
import type { ReactNode } from "react";
import NavBar from "./navbar";

const Header: NextPage<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="sticky top-0 backdrop-blur-lg h-[80px] pl-6 w-full inline-flex items-center justify-between z-10">
            <div className="justify-start inline-flex items-center content-center">
                {children}
            </div>

            <NavBar />
        </div>
    )
}

export default Header