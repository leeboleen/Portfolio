import imageFields from '@/assets/graphql/elements/image';

export default `
  _modelApiKey
  text
  image {
    ${imageFields(500, 500)}
  }
`;
