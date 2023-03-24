import { type NextPage } from "next";
import Link from "next/link"

const NavBar: NextPage = () => {  
    return (
        <nav className="absolute bottom-0 inline-flex justify-center content-center items-center max-w-s rounded-md bg-zinc-900/80 p-2 mb-10 h-16">
            <Link href='/'>
                <button
                className="rounded-md bg-neutral-900 w-20 py-3 text-white no-underline transition hover:bg-white/20 mr-2"
                >
                  Home
                </button>
            </Link>
            <input
            type='text'
            placeholder="Search"
            className="transition duration-150 ease-out border border-neutral-700 rounded-full bg-white/10 w-10 hover:w-1/6 active:w-1/6 focus:outline-none py-3 text-white no-underline transition hover:bg-white/20 hover:ease-in active:ease-in mr-2 p-3"
            />
            <Link href='/feed'>
                <button
                className="border border-neutral-700 rounded-md bg-white/10 w-20 py-3 text-white no-underline transition hover:bg-white/20 mr-1"
                >
                  Feed
                </button>
            </Link>
            <Link href='/profile'>
                <button
                className="border border-neutral-700 rounded-md bg-white/10 w-24 py-3 text-white no-underline transition hover:bg-white/20"
                >
                  Profile
                </button>
            </Link>
        </nav>
    )
  }

  export default NavBar