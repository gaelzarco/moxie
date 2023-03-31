import { 
  type NextPage,
} from "next";
import { api } from "~/utils/api";
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import { FiLogOut } from 'react-icons/fi'

import CreatePost from "./components/createpost";
import PostView from "./components/postview";

const Home: NextPage = () => {
  const { isSignedIn } = useUser()

  return (
    <>
        <div id='home' className="bg-white flex flex-col col-span-2 absolute w-full min-w-750 md:min-w-0 md:max-2xl:w-9/12 md:max-2xl:right-0 2xl:relative">

          <div className="sticky top-0 backdrop-blur-lg p-4 w-full m-w-full flex justify-between border-x border-b border-stone-300 hover:cursor-pointer">
            <h2 className="text-1xl font-bold hover:text-stone-700">
              Home
            </h2>
            <div className="text-1xl font-bold inline-flex items-center hover:text-stone-500 hover:cursor-pointer">
              {!isSignedIn && <SignInButton />}
              {!!isSignedIn && (
                <>
                  <FiLogOut className="mr-3 mt-1" size={20}/>
                  <SignOutButton />
                </>
              )}
            </div>

          </div>

          <Feed />
        </div>
    </>
  );
};

const Feed = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();
  const { isSignedIn } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Something went wrong...</div>

  return (
      <div className='flex flex-col items-center justify-center'>
        {!!isSignedIn && <CreatePost />}
        {!!data && (
          <PostView data={data} />
        )}
      </div>
    )
  }

export default Home;
