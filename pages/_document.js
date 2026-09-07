import { Html, Head, Main, NextScript } from "next/document";

// The Plus Jakarta Sans font is self-hosted through next/font in _app.js, so
// there is no third-party stylesheet to block rendering here.
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
