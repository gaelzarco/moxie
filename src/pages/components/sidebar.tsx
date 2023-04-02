import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const SideBar: NextPage = () => { 
    const { user } = useUser()
    
    return (
      <nav className="flex flex-col col-span-1 h-screen">
          <div className="w-11/12 mx-auto mt-2 h-72 rounded-xl bg-neutral-100">
            <div className="w-full top-0 h-10 rounded-xl items-center m-3 ml-4">
                <h2 className="font-bold text-xl mb-6">Who to follow</h2>
                <div className="w-11/12 inline-flex justify-between items-center">
                    {!!user && (
                        <div className="flex">
                            <Image src={user.profileImageUrl} width={50} height={50} className="rounded-full" alt='user avatar'/>
                            <div className="flex flex-col ml-3">
                                <h2 className="font-medium">Gael Zarco</h2>
                                <p className="text-stone-500 text-sm">@{user.username}</p>
                            </div>
                        </div>
                    )}
                    <button
                    className="rounded-full bg-black text-white px-8 h-10 font-semibold no-underline transition hover:bg-stone-800 hover:cursor-pointer"
                    >
                    Follow
                    </button>
                </div>
            </div>
          </div>
      </nav>
    )
  }

  export default SideBar