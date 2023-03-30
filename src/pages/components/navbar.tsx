import { type NextPage } from "next";
import Link from "next/link"

const NavBar: NextPage = () => {  
    return (
        <div className="m-auto flex justify-center content-center">
          <nav className="fixed bottom-0 h-16 max-w-xs rounded-md bg-zinc-900/80 p-2 mb-6">
            <Link href='/'>
                <button
                className="rounded-md bg-neutral-900 w-24 py-3 text-white no-underline transition hover:bg-white/20 mr-2"
                >
                  Home
                </button>
            </Link>
        </nav>
        </div>
    )
  }

  export default NavBar