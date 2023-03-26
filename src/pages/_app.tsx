import { type AppType } from "next/app";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "./components/navbar";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
      <ClerkProvider {...pageProps}>
        <Head>
          <title>Moxie</title>
          <meta name="description" content="Blazingly fast, secure, and versatile. Meet the next generation of social media." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
        <NavBar />
      </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
