import { type NextPage } from "next";
import NavBar from "./components/navbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'

const Home: NextPage = () => {
  const user = useUser()

  return (
    <>
      <main className="flex bg-black h-screen flex-col items-center justify-center">
      <NavBar />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-3xl text-white">
              Moxie
            </h2>
            <p className="text-2xl text-white">
              The bleeding edge social media site made for everyone.
            </p>

            <div className="text-white">
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

export const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      {sessionData ? (
        <button
        className="w-48 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={() => void signOut()}
      >
        Sign Out
      </button>
      ) : (
        <button
          className="w-48 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => void signIn()}
          >
          Get Started
        </button>
      )}
    </div>
  );
};
