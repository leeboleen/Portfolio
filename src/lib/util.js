import { request } from '@/lib/datocms.mjs';
import gql from 'graphql-tag';

const GET_ALL_PATHS = (limit, skip, key, sitemap = false) => gql`
  query {
    ${key}(first: ${limit}, skip: ${skip}) {
      id
      slug
      ${sitemap ? 'seo {noIndex}' : ''}
    }
  }
`;

export async function getAllPaths(key, sitemap) {
  const limit = 100;
  let skip = 0;
  let keepQuerying = true;
  let allPaths = [];

  while (keepQuerying) {
    const data = await request({
      query: GET_ALL_PATHS(limit, skip, key, sitemap),
    });

    allPaths = allPaths.concat(data[key]);
    skip += limit;

    if (data[key].length < limit) {
      keepQuerying = false;
    }
  }

  return allPaths;
}

export async function getPaths(key) {
  const allPaths = await getAllPaths(key);

  const paths = allPaths.map(path => ({
    params: { slug: path.slug },
  }));

  paths.push({
    params: { slug: 'draft' },
  });

  return paths;
}

export async function getProps(preview, slug, query) {
  if (!preview && slug === 'draft') {
    return {
      notFound: true,
    };
  }

  const data = {
    query,
    includeDrafts: preview,
  };

  return {
    props: {
      subscription: preview
        ? {
          ...data,
          query: data.query.loc && data.query.loc.source.body,
          initialData: await request(data),
          token: process.env.NEXT_PUBLIC_ENV_DATOCMS_API_TOKEN,
        }
        : {
          enabled: false,
          initialData: await request(data),
        },
    },
  };
}

export function getData(subscription, router, query) {
  let draftPreview = false;

  let draftSubscription = {};

  if (router.asPath.includes('/draft') && router.query.realSlug && subscription.includeDrafts) {
    draftPreview = true;

    const draftQuery = query;

    draftSubscription = {
      ...subscription,
      query: draftQuery.loc && draftQuery.loc.source.body,
    };
  }

  return draftPreview ? draftSubscription : subscription;
}

export async function generateSiteMap(key, type) {
  const allPaths = await getAllPaths(key, true);

  const paths = allPaths.filter(({ seo }) => !seo?.noIndex).flatMap(({ slug }) => slug === 'homepage' ? '' : `${slugPrepend(type)}${slug}`);

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${paths.map(slug => {
    return `
       <url>
           <loc>${process.env.NEXT_PUBLIC_SITE_URL}/${slug}</loc>
       </url>
     `;}).join('')}
   </urlset>
 `;
}


export const slugPrepend = (type = 'page') => {
  switch (type) {
  // add other models here with / at the end e.g.
  // case 'resource':
  //   return 'resources/';
  default:
    return '';
  }
};
