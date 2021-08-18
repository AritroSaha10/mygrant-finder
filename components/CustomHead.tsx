import Head from "next/head";

// TODO: Add custom head for each grant
export default function CustomHead({ pageName }) {
  return (
    <Head>
      <title>{pageName} | MyGrant</title>
      <meta name="description" content="Search through a large choice of grants using the MyGrant Finder!" />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:title" content="MyGrant | Finder" />
      <meta property="og:description" content="Search through a large choice of grants using the MyGrant Finder!" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/images/logo.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="287" />
      <meta property="og:image:height" content="91" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content="MyGrant | Finder" />
      <meta property="twitter:description" content="Search through a large choice of grants using the MyGrant Finder!" />
      <meta property="twitter:image:src" content="/images/logo.png" />
    </Head>
  );
}
