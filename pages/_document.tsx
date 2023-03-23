import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Generate your OceanBase SQL in seconds."
          />
          <meta 
            property="og:site_name" 
            content="sql.amber-moe.io" 
          />
          <meta
            property="og:description"
            content="Generate your OceanBase SQL in seconds."
          />
          <meta property="og:title" content="OceanBase SQL Generator" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="OceanBase SQL Generator" />
          <meta
            name="twitter:description"
            content="Generate your OceanBase SQL in seconds."
          />
          <meta
            property="og:image"
            content="https://sql.amber-moe.io/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://sql.amber-moe.io/og-image.png"
          />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-DEWJBLD2BG"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-DEWJBLD2BG');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
