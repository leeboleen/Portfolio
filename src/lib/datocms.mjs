import axios from 'axios';

import gql from 'graphql-tag';

export async function request({ query, variables, preview }) {
  let endpoint = 'https://graphql.datocms.com';

  if (process.env.NEXT_ENV_DATOCMS_ENVIRONMENT) {
    endpoint += `/environments/${process.env.NEXT_ENV_DATOCMS_ENVIRONMENT}`;
  }

  if (preview) {
    endpoint += '/preview';
  }

  const { data } = await axios.post(
    endpoint,
    {
      query: query.loc && query.loc.source.body,
      variables,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ENV_DATOCMS_API_TOKEN}`,
      },
    }
  );

  if (data.errors) {
    throw JSON.stringify(data.errors);
  }

  return data.data;
}

export const seoMetaTagsFields = gql`
  fragment seoMetaTagsFields on Tag {
    attributes
    content
    tag
  }
`;
