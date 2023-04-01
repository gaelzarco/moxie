import { 
  type NextPage,
} from "next";
import { api } from "~/utils/api";
import { useUser } from '@clerk/nextjs'

import CreatePost from "./components/createpost";
import PostView from "./components/postview";

const Home: NextPage = () => {
  return (
    <>
      <div id='header' className="sticky top-0 backdrop-blur-lg p-4 w-full flex border-x border-b border-stone-300">
        <h2 className="text-2xl font-bold">
          Home
        </h2>
      </div>

      <Feed />
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
