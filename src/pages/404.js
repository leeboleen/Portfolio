import Link from 'next/link';
import Head from 'next/head';

function Custom404() {
  const back = () => {
    window.history.back();
  };

  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>

      <div className="container error">
        <h1>The page you are looking for could not be found.</h1>

        <div>
          <div onClick={back}>
            <span data-text="BACK TO PREVIOUS PAGE">BACK TO PREVIOUS PAGE</span>
          </div>
        </div>

        <div>
          <Link href="/">
            <span data-text="Return to homepage">Return to homepage</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Custom404;
