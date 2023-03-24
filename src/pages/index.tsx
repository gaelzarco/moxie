import { type NextPage } from "next";
import NavBar from "./components/navbar";
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'

const Home: NextPage = () => {
  const user = useUser()

  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center">
      <NavBar />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-3xl">
              Moxie
            </h2>
            <p className="text-2xl">
              The bleeding edge social media site made for everyone.
            </p>

            <div className="">
              {!user.isSignedIn && <SignInButton />}
              {!!user.isSignedIn && <SignOutButton />}
            </div>

          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
