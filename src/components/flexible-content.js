import ExampleBlock from '@/components/blocks/example-block';

function FlexibleItem({ details }) {
  const allComponents = {
    example_block: ExampleBlock,
  };

  const FlexibleComponent = allComponents[details._modelApiKey];

  if (FlexibleComponent) {
    return <FlexibleComponent {...details} />;
  }
}

export default function FlexibleContent({ page }) {

  if (!page?.flexibleContent || !page.flexibleContent.length > 0) {
    return null;
  }

  return (
    <main>
      {
        page.flexibleContent.map((details, index) => (
          <FlexibleItem details={details} key={index}/>
        ))
      }
    </main>
  );
}
