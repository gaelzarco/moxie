import type { NextPage, GetServerSideProps } from "next";
import { api } from "~/utils/api";
import { useUser } from '@clerk/nextjs'

import CreatePost from "./components/createpost";
import FeedView from "./components/feedview";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

const Home: NextPage = () => {
  return (
    <div className="h-auto min-h-screen bg-white min-w-750 md:max-2xl:w-9/12 md:max-2xl:right-0 max-2xl:absolute border-b border-x border-stone-300">
      <div id='header' className="sticky top-0 backdrop-blur-lg p-4 w-full flex border-b border-stone-300">
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

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Something went wrong...</div>

  return (
      <>
        {!!isSignedIn && <CreatePost />}
        {!!data && <FeedView {...data} />}
      </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const ssg = generateSSGHelper()

  await ssg.posts.getAll.prefetch()

  return {
    props: {
      trpcState: ssg.dehydrate(),
    }
  }
}

export default Home;
