import type { NextPage } from "next";
import { useUser } from '@clerk/nextjs'
import { api } from "~/utils/api";

import CreatePost from "./components/createpost";
import FeedView from "./components/feedview";
import Loading from "./components/loading";
import Header from "./components/header";

const Home: NextPage = () => {
  
  return (
    <div className="h-auto min-h-screen w-full pb-5 dark:bg-black max-w-[750px]">
      <Header>
        <h2 className="text-2xl font-bold">Home</h2>
      </Header>

      <Feed />
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
        {!!data && <FeedView posts={data} />}
      </>
    )
}

export default Home;
