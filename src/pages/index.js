import FlexibleContent from '@/components/flexible-content';
import flexibleContentFields from '@/assets/graphql/components/flexible-content';
import { seoMetaTagsFields } from '@/lib/datocms.mjs';
import gql from 'graphql-tag';
import { renderMetaTags, useQuerySubscription } from 'react-datocms';
import Head from 'next/head';
import DraftPreviewStatus from '@/components/draft-preview-status';
import { getProps } from '@/lib/util';

const query = gql`query {
  page(filter: {slug: {eq: "homepage"}}) {
    title
    seo: _seoMetaTags {
      ...seoMetaTagsFields
    }
    ${flexibleContentFields}
  }
}
${seoMetaTagsFields}`;

export async function getStaticProps({ preview }) {
  return await getProps(preview, '', query);
}

export default function Index({ subscription }) {
  const { data, error, status } = useQuerySubscription(subscription);

  if (error) {
    console.log('Error code:' + ` ${error.code}`);
    console.log('Error:' + ` ${error.message}`);
  }

  const { page } = data;

  return (
    <>
      <Head>
        { renderMetaTags([...page.seo]) }
      </Head>

      <DraftPreviewStatus status={status} includeDrafts={subscription.includeDrafts ?? false} />

      <h1>{ page.title }</h1>

      <FlexibleContent page={page} />
    </>
  );
}
