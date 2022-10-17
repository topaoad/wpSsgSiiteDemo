import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/custom.scss";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <div className="font-body">
      <Component {...pageProps} />
    </div>
  );
}


