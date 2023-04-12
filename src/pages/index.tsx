import type { NextPage } from "next";
import { useUser } from '@clerk/nextjs'
import { api } from "~/utils/api";

import CreatePost from "./components/createpost";
import FeedView from "./components/feedview";
import Loading from "./components/loading";
import NavBar from "./components/navbar";

const Home: NextPage = () => {
  return (
    <div className="h-auto min-h-screen w-full pb-5 dark:bg-black max-w-[750px]">

      <div className="sticky top-0 backdrop-blur-lg p-4 h-[80px] pl-9 w-full inline-flex justify-between items-center z-10">
        <h2 className="text-2xl font-bold">Home</h2>
        <NavBar />
      </div>

      <div className='flex items-center justify-center'>
        <div className="m-auto text-left w-full">
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
