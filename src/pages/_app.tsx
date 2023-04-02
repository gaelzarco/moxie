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
          <div className="h-screen bg-white col-span-1">
          <NavBar />
          </div>
          <div id='home' className="flex flex-col col-span-2 w-full min-w-750 bg-white max-lg:absolute">
            <Component {...pageProps} />
          </div>
          <div className="h-screen bg-white col-span-1">
          <SideBar />
          </div>
        </main>
      </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
