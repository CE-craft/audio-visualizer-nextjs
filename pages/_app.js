import "../styles/globals.css";
import CanvasThree from "../components/CanvasThree";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <CanvasThree />
    </>
  );
}

export default MyApp;
