import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>

        <body className="body">
          <div className="">
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
