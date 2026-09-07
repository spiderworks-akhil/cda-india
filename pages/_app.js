import "@/styles/globals.css";
import "@/styles/theme.css";
import "@/styles/fonts.css";
import Head from "next/head";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useEffect, useState } from "react";

import "aos/dist/aos.css";
import AOS from "aos";
import { useUtmTracker } from "@/components/common/utmData";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

// Self-hosted, subsetted and preloaded by Next; theme.css reads the family
// through the --font-jakarta variable set below.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

function MyApp({ Component, pageProps }) {
  useUtmTracker();

  function useDeferredRecaptchaKey(siteKey) {
    const [armed, setArmed] = useState(false);

    useEffect(() => {
      if (!siteKey) return;

      const arm = () => setArmed(true);
      INTERACTION_EVENTS.forEach((evt) =>
        window.addEventListener(evt, arm, { once: true, passive: true })
      );

      return () =>
        INTERACTION_EVENTS.forEach((evt) =>
          window.removeEventListener(evt, arm)
        );
    }, [siteKey]);

    // Any form submission is necessarily preceded by one of the events above, so
    // executeRecaptcha is always ready by the time a form needs it.
    return armed ? siteKey : undefined;
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true, // whether animation should happen only once
    });
  }, []);

  return (
    <>
      <GoogleReCaptchaProvider
        reCaptchaKey={siteKey}
        scriptProps={{
          async: true,
          defer: true,
        }}
      >
        <Head></Head>
        <style jsx global>{`
          :root { --font-jakarta: ${jakarta.style.fontFamily}; }
        `}</style>
        <Component {...pageProps} />
      </GoogleReCaptchaProvider>
    </>
  );
}

export default MyApp;
