import type { NextPage } from "next";
import { useUser } from '@clerk/nextjs'
import { api } from "~/utils/api";

import CreatePost from "./components/createpost";
import FeedView from "./components/feedview";
import Loading from "./components/loading";

const Home: NextPage = () => {
  return (
    <div 
    className="h-auto min-h-screen max-md:w-screen dark:bg-neutral-900 min-w-750 md:max-2xl:w-9/12 md:max-2xl:right-0 max-2xl:absolute border-b border-x dark:border-stone-700">
      <div id='header' className="sticky top-0 backdrop-blur-lg p-4 w-full flex border-b dark:border-stone-700 z-10">
        <h2 className="text-2xl font-bold">
          Home
        </h2>
      </div>

      <div className='flex flex-col items-center justify-center'>
      <div className="m-auto text-left w-full min-w-full">
        <Feed />
        </div>
      </div>
    </div>
  );
};

const Feed: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();
  const { isSignedIn } = useUser()

  if (isLoading) return <Loading home/>
  if (!data) return <div>Something went wrong...</div>

  return (
      <>
        {!!isSignedIn && <CreatePost />}
        {!!data && <FeedView {...data} />}
      </>
    )
}

export default Home;
