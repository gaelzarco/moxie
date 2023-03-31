import { type NextPage } from "next";
import Link from "next/link"
import { SiTwitter } from "react-icons/si";
import { HiOutlineHome } from "react-icons/hi";

const NavBar: NextPage = () => {  
    return (
      <nav className="item-start col-span-1 h-screen">
        <div className="flex flex-col w-11/12 mx-auto my-5 h-full rounded-xl">
          <Link href='/'>
              <SiTwitter
              className="text-black hover:text-stone-500"
              size={30}
              />
          </Link>
          {/* <Link href='/'>
            <HiOutlineHome
              className="text-black hover:text-stone-500"
              size={30} 
            />
          </Link> */}
          </div>
      </nav>
    )
  }

export default NavBar