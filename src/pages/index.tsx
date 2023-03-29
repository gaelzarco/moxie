import { 
  type NextPage,
} from "next";
import Image from "next/image";
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import { api } from "~/utils/api";
import CreatePost from "./components/createpost";

const Home: NextPage = () => {
  const { isSignedIn } = useUser()

  return (
    <>
      <main className="flex h-screen flex-col">
        <div className="flex flex-col items-center justify-center">

          <div className="w-4/6 flex justify-between border-x border-stone-300">
            <h2 className="text-2xl font-bold hover:text-stone-700">
              Home
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
  const { isSignedIn } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Something went wrong...</div>

  return (
      <div className='flex flex-col items-center justify-center w-4/6'>
          {!!isSignedIn && <CreatePost />}
          {data.map(({ post, user }) => {
                return (
                  <div key={post.id} className="m-auto text-left border-x border-b border-stone-300 w-full p-4">
                    <div className="flex leading-none">
                      <Image className="rounded-full w-10 h-10" src={user.profileImageURL} height={50} width={50} alt="Profile Picture" />
                        <div className="pl-2 mb-2">
                          <div className=" inline-flex mb-4">
                            <p className="pl-2">Gael Zarco</p>
                            <p className="text-stone-500 pl-2">@{user.userName === null ? 'username' : user.userName}</p>
                          </div>
                          <h4 className="pl-2">{post.body}</h4>
                          {post.link && (
                            <Image className="h-auto w-full mt-4" src={post.link} height={300} width={500} alt="Attached Media for Post" />
                          )}
                        </div> 
                    </div> 
                  </div>
              )
          })}
      </div>
    )
  }

export default Home;
