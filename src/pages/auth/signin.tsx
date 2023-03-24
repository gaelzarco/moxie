import type { GetServerSideProps } from "next";
import { getProviders, signIn} from "next-auth/react";
import type { AppProps } from "next/app";
import Link from "next/link";

const SignIn = ({ providers }: { providers: AppProps }) => {
  return (
    <div className='h-screen w-screen bg-stone-800 text-white flex flex-col items-center justify-center'>
      <div className='h-5/6 w-2/3 bg-stone-900 rounded-lg flex flex-col drop-shadow-lg items-center justify-center'>
        <h1 className='text-3xl font-semibold'>Sign in</h1>
        <div className="justify-center border-bottom">
          {Object.values(providers).map((provider) => (
            <div className="flex justify-center">
              <button
              className="w-35 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              key={provider.id}
              onClick={() => 
                signIn(provider.id, {
                callbackUrl: `${window.location.origin}`,
              })
            }>Sign in with {provider.id === 'github'? 'Github' : 'E-Mail'}</button>
            </div>
          ))}
          <div className="flex justify-center">
          <Link href='/'>
            <button
            className="w-35 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            >
              Home
            </button>
          </Link>
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async () => {
    const providers = await getProviders()

    return {
        props: { providers },
    }
}