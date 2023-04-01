import { 
  type NextPage,
} from "next";
import { api } from "~/utils/api";
import { useUser } from '@clerk/nextjs'

import CreatePost from "./components/createpost";
import FeedView from "./components/feedview";

const Home: NextPage = () => {
  return (
    <div className="overflow-y-scroll h-screen bg-white min-w-750 md:max-2xl:w-9/12 md:max-2xl:right-0 max-2xl:absolute">
      <div id='header' className="sticky top-0 backdrop-blur-lg p-4 w-full flex border-b border-stone-300">
        <h2 className="text-2xl font-bold">
          Home
        </h2>
      </div>

      <Feed />
    </div>
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
          <FeedView data={data} />
        )}
      </div>
    )
  }

export default Home;
