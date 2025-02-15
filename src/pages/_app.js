import '@/styles/globals.scss';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { siteSettingsState, getSiteSettings } from '@/store';
import ScrollLocker from '@/components/scroll-locker';
import GridVisualiser from '@/components/grid-visualiser';
import { useEffect, useState } from 'react';
import PageTransition from '@/components/page-transition';

export default function App({ Component, pageProps, siteSettings, router }) {
  const [windowWidth, setWindowWidth] = useState(0);

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
  }, [windowWidth]);

  return (
    <RecoilRoot
      initializeState={
        (({ set }) => (
          set(siteSettingsState, siteSettings)
        ))
      }>
      <Head>
        <title>hf-next-template</title>

        <meta name="description" content="" />

        <meta name="format-detection" content="telephone=no" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        { siteSettings?._site?.noIndex && <meta name="robots" content="noindex" /> }

        { siteSettings?._site?.favicon.map(({ attributes }) => (<link key={attributes.sizes} {...attributes}/>)) }
      </Head>

      <ScrollLocker>
        <PageTransition route={router.asPath.split('?')[0]} >
          <Component {...pageProps} />
        </PageTransition>

        <GridVisualiser/>
      </ScrollLocker>
    </RecoilRoot>
  );
}

App.getInitialProps = async() => ({
  siteSettings: {
    ...await getSiteSettings(),
  },
});
