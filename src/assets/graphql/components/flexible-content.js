import exampleBlockFields from '@/assets/graphql/components/blocks/example-block';

export default `flexibleContent {
  ... on ExampleBlockRecord {
    ${exampleBlockFields}
  }
}`;
