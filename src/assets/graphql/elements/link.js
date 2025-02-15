import slugFields from '@/assets/graphql/elements/post-type-slugs';

export default `
id
customUrl
linkType
newTab
title
internalUrl {
  ${slugFields}
}
`;
