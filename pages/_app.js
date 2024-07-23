import "../app/globals.css";
import { SessionProvider } from "next-auth/react";
import { themeChange } from "theme-change";
import { useEffect } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
