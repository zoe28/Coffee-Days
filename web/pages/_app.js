import TopNavbar from "../components/TopNavbar"


function MyApp({ Component, pageProps }) {
  return (
    <>
      <TopNavbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
