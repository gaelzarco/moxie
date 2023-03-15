import { GetServerSideProps} from "next";
import { getProviders, signIn} from "next-auth/react";
import { type AppProps } from "next/app";

const SignIn = ({ providers }: { providers: AppProps }) => {
  return (
    <div className='h-screen w-screen bg-black text-white flex flex-col items-center justify-center'>
      <h1 className='justify-center'>Sign in</h1>
      <div className="justify-center">
        {Object.values(providers).map((provider) => (
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            key={provider.id}
            onClick={() => 
              signIn(provider.id, {
              callbackUrl: `${window.location.origin}`,
            })
          }>Sign in with Github</button>
        ))}
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