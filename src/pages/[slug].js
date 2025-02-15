import FlexibleContent from '@/components/flexible-content';
import flexibleContentFields from '@/assets/graphql/components/flexible-content';
import { seoMetaTagsFields } from '@/lib/datocms.mjs';
import gql from 'graphql-tag';
import { useQuerySubscription, renderMetaTags } from 'react-datocms';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DraftPreviewStatus from '@/components/draft-preview-status';
import { getPaths, getProps, getData } from '@/lib/util';

const query = path => gql`query {
  page(filter: {slug: {eq: "${path}"}}) {
    title
    seo: _seoMetaTags {
      ...seoMetaTagsFields
    }
    ${flexibleContentFields}
  }
}
${seoMetaTagsFields}`;

export async function getStaticProps({ preview, params }) {
  return await getProps(preview, params.slug, query(params.slug));
}

export async function getStaticPaths() {
  return { paths: await getPaths('allPages'), fallback: false };
}

export default function Slug({ subscription }) {
  const router = useRouter();
  const { data, error, status } = useQuerySubscription(getData(subscription, router, query(router.query.realSlug)));

  if (error) {
    console.log('Error code:' + ` ${error.code}`);
    console.log('Error:' + ` ${error.message}`);
  }

  const { page } = data;

  if (page) {
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
}
