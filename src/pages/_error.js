import Link from 'next/link';
import Head from 'next/head';

function Error({ statusCode }) {
  const back = () => {
    window.history.back();
  };

  return (
    <>
      <Head>
        <title>{ statusCode ? `Error ${statusCode}` : 'An error occured on the client' }</title>
      </Head>

      <div className="container error">
        <h1>OOPS SOMETHING WENT WRONG</h1>

        { statusCode === 404 ? <p>Page not found</p> : <p>The page you’re looking for couldn’t be found</p> }

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

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
