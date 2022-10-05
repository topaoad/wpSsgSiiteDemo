

import type { AppProps } from "next/app";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}


