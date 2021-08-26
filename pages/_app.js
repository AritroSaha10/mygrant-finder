import CookieConsent, { Cookies } from "react-cookie-consent";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
    </>
  );
}

export default MyApp
