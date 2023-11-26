import React from "react";
import "./global.css";
import { AppProps } from "next/app";

const _app = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="max-w-[100vw] h-[100vh]">
      <Component {...pageProps} />
    </div>
  );
};

export default _app;
