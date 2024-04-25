import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { DatesProvider } from "@mantine/dates";
import { ModalsProvider } from "@mantine/modals";

import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";

export default function App({ Component, pageProps }: any) {
  return (
    <UserProvider>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <DatesProvider settings={{}}>
            <Head>
              <title>Sunshine Badminton</title>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
              />
              <link rel="shortcut icon" href="/favicon.svg" />
            </Head>
            <Component {...pageProps} />
            <ToastContainer />
          </DatesProvider>
        </ModalsProvider>
      </MantineProvider>
    </UserProvider>
  );
}
