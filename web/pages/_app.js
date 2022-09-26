import TopNavbar from "../components/TopNavbar";
import { useLoadScript } from "@react-google-maps/api";

import "bulma/css/bulma.min.css";

function MyApp({ Component, pageProps }) {
  const { isLoaded } = useLoadScript({
    libraries: ["places"],
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // show "Loading..." while GMaps JS is loading
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <TopNavbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
