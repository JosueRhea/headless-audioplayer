import { AppProps } from "next/app";
import "headless-audioplayer-react/dist/cjs/css/slider.css";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
export default MyApp;
