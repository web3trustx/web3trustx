import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#00B5AD" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
