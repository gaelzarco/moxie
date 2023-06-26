import { type FormEvent, useState } from "react"
import { api } from "~/utils/api"
import { RouterOutputs } from "~/utils/api"
import Image from 'next/image'
import Link from 'next/link'

import { SearchOptiosDropDown } from "./dropdownmenus"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Jelly } from "@uiball/loaders"

// type ResultType = 

export default function SearchBar() {
    const [ searchCategory, setSearchCategory ] = useState<string>("users")
    const [ searchQuery, setSearchQuery ] = useState<string | null>(null)
    const [ result, setResult ] = useState<RouterOutputs["search"]["findUser"] | null >(null)

    const setSearchCategoryHandler = (category: string) => {
        setSearchCategory(category)
        setResult(null)
        setSearchQuery(null)
        searchMutation.reset()
    }

    const searchMutation = api.search.findUser.useMutation({
        onSuccess: async (data) => {
            setResult(data)
        },
        onError: (err) => console.log(err),
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!searchQuery) return console.log("Search query cannot be empty.")

        searchMutation.mutate({
            query: searchQuery
        })
    }

    return (
        <>
            {!!result && searchMutation.isSuccess && (
                <div className="max-md:text-sm flex flex-col mx-4 items-center mb-4 p-2 border border-neutral-700 bg-neutral-900/30 backdrop-blur-2xl rounded-xl text-white">
                    {result.length === 0 ? (
                        <h2 className="text-md max-md:text-sm py-2 px-2 self-start">User not found.</h2>
                    ) : (
                        <h2 className="text-lg max-md:text-md py-2 px-2 self-start font-bold">Users</h2>
                    )}
                    {result.map((user, idx) => {
                        return (
                            <Link href={`/profile/${user.id}`} key={idx} className="flex flex-row p-2 mb-1 w-full items-center cursor-pointer">
                                <div className="inline-flex items-center rounded-full h-10 w-10 border border-neutral-700">
                                    <Image src={user.profileImageUrl} alt='User Profile' width={100} height={100} className="w-full h-full rounded-full"/>
                                </div>
                                <div className="flex flex-col ml-4">
                                    <p className="text-md max-md:text-sm font-semibold leading-10">{user.firstName}{' '}{user.lastName}</p>
                                    <p className="text-stone-500 text-sm max-md:text-sm">@{!user.username ? 'username' : user.username}</p>
                                </div>
                            </Link> 
                        )
                    })}
                </div>
            )}

            {/* {searchMutation.isError && (
                <div className="max-md:text-sm flex flex-col mx-4 items-center mb-4 p-2 border border-neutral-700 bg-neutral-900/30 backdrop-blur-2xl rounded-xl text-white">
                    {searchCategory !== 'replies' ? (
                        `${searchCategory.charAt(0).toUpperCase() + searchCategory.slice(1, -1)}` + " not found."
                    ) : (
                        "Reply not found."
                    )}
                </div>
            )}
         */}
         
            <div className="flex items-center mb-4 mx-4 border border-neutral-700 bg-neutral-900/30 backdrop-blur-2xl rounded-xl text-white">
                <div className="flex flex-row items-center px-2 py-2 mr-2">
                    <SearchOptiosDropDown category={searchCategory} setCategory={setSearchCategoryHandler}/>
                </div>
                <form 
                    className='inline-flex items-center w-full h-full mr-4'
                    onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Search'
                        className="w-full h-full py-2 bg-transparent focus-within:outline-none text-md max-md:text-sm"
                        value={searchQuery || ''}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setResult(null)
                            searchMutation.reset()
                        }}
                    />
                    {searchMutation.isLoading && (
                        <div className="flex items-center self-center">
                            <Jelly color="white" size={15} />
                        </div>
                    )}
                </form>
            </div>
        </>
    )
}