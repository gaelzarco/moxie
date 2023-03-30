import { type AppType } from "next/app";
import Head from "next/head";
import { Plus_Jakarta_Sans } from 'next/font/google';
import { ClerkProvider } from "@clerk/nextjs";
// import NavBar from "./components/navbar";

import { api } from "~/utils/api";
import "~/styles/globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: [ "latin" ],
  weight: [ "400", "700" ],
  style: [ "normal" ],
  variable: '--font-jakartaSans'
})

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
      <ClerkProvider {...pageProps}>
        <Head>
          <title>Moxie</title>
          <meta name="description" content="Blazingly fast, secure, and versatile. Meet the next generation of social media." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={`${jakartaSans.variable} font-sans flex h-screen w-full min-w-full flex-col`}>
          <Component {...pageProps} />
        </main>
        {/* <NavBar /> */}
      </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
