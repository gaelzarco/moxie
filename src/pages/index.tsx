import { 
  type NextPage,
} from "next";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import { api } from "~/utils/api";
import CreatePost from "./components/createpost";

const Home: NextPage = () => {
  const { isSignedIn } = useUser()

  return (
    <>
      <main className="flex h-screen flex-col">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 mt-10 ">

          <div className="w-full flex justify-between gap-2">
            <h2 className="text-3xl hover:text-stone-500">
              <Link href='/'>Moxie</Link>
            </h2>

            <div className="text-2xl hover:text-stone-500">
              {!isSignedIn && <SignInButton />}
              {!!isSignedIn && <SignOutButton />}
            </div>

          </div>

          <Feed />
        </div>
      </main>
    </>
  );
};

const Feed = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Something went wrong...</div>

  return (
      <div className='flex flex-col items-center justify-center'>
        <div className="w-9/2">
          <CreatePost />
          {data.map(({ post, user }) => {
                return (
                  <div key={post.id} className="border border-stone-300 w-full p-4">
                      <div className="flex">
                          <Image className="rounded-full" src={user.profileImageURL} height={50} width={50} alt="Profile Picture" />
                          <div className="flex">
                              <div className="block">
                              <h3>@{user.userName}</h3>
                              </div> 
                              <h3>{post.body}</h3>
                          </div> 
                      </div>
                      {post.link && (
                      <div className="p-5 mt-5">
                          <Image src={post.link} className='h-auto w-full' height={ 300 } width={ 350 } alt="Attached Media for Post" />
                      </div>
                      )}
                  </div>
              )
          })}
        </div>
      </div>
    )
  }

export default Home;
