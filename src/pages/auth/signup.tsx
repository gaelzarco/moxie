import { signIn } from "next-auth/react";
import type { NextPage } from "next";

import UserForm from "../components/userform";

const NewUser: NextPage = () => {
  return (
    <div className='h-screen w-screen bg-stone-800 text-white flex flex-col items-center justify-center'>
      <div className='h-5/6 w-2/3 bg-stone-900 rounded-lg flex flex-col drop-shadow-lg items-center justify-center'>
        <h1 className='text-3xl font-semibold'>Create Account</h1>
        <UserForm />
        <div>
        <p className="text-2xl font-semibold">Already have an account?</p>
        </div>
        <div>
            <button
                className="w-48 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                onClick={() => void signIn()}
            >
                Sign-In
            </button>
        </div>
      </div>
    </div>
  );
};

export default NewUser;