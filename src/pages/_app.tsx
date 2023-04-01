import { type AppType } from "next/app";
import Head from "next/head";
import { Plus_Jakarta_Sans } from 'next/font/google';
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";
import "~/styles/globals.css";
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: [ "latin" ],
  weight: [ "400", "500", "600", "700", "800" ],
  style: [ "normal",  ],
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
        <main className={`${jakartaSans.variable} font-sans h-auto mx-auto grid grid-cols-4 max-w-screen-2xl`}>
          <NavBar />
          <div id='home' className="bg-white flex flex-col col-span-2 absolute w-full min-w-750 md:min-w-0 md:max-2xl:w-9/12 md:max-2xl:right-0 2xl:relative">
            <Component {...pageProps} />
          </div>
          <SideBar />
        </main>
      </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
