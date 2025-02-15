import SiteImage from '@/components/site-image';

export default function ExampleBlock({ text, image }) {
  return (
    <div className="example-block">
      { text && <p>{ text }</p> }

      {
        image.url && (
          <SiteImage
            {...image}
            smWidth={187.5}
            mdWidth={720.5}
            className="!w-[50vw]"
          />
        )
      }
    </div>
  );
}
