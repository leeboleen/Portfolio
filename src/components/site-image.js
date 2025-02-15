import React from 'react';
import { Image } from 'react-datocms';

export default function SiteImage({
  className = '',
  alt,
  url,
  title,
  width,
  height,
  mimeType,
  lazy = true,
  smWidth,
  mdWidth,
  layout= 'responsive',
  style,
  usePlaceholder = true,
  responsiveImage,
  focalPoint,
  responsiveWidth = true,
}) {
  /*
   ~ HOW TO USE THIS COMPONENT ~

   An example GraphQL query looks like this:
      _modelApiKey
      text
      image {
        ${imageFields(500, 500)}
      }

   In imageFields, specify the largest width the image will appear at in pixels.
   If you've already created the parent element the image will sit in (for example a grid cell),
   the most accurate way to do this is via hovering the element in inspector to see the actual width in px.
   Otherwise, take it from the desktop design. Add the correct image height according to the aspect ratio -
   if you took the width from the designs you can also just take the image from the designs.

   An example usage for responsive images (widths that scale with the viewport width) looks like this:
      <SiteImage
        {...image}
        smWidth={187.5}
        mdWidth={720.5}
        className="!w-[50vw]"
      />

   smWidth = image width in px when website is viewed at 375px (e.g. 187.5)
   mdWidth = image width in px when website is viewed at 1440px (e.g. 720.5)

   An example usage for fixed width images looks like this:
      <SiteImage
        {...image}
        smWidth={100}
        mdWidth={500}
        responsiveWidth={false}
        className="!w-[100px] md:!w-[500px]"
      />

   smWidth = image width in px
   mdWidth = image width in px

   Q: "Should I use the .image class on the parent element/use object-fit: cover?"
   A: In most cases, this is no longer necessary. Dato will produce the image in the correct aspect ratio
      and crop according to the focalpoint set in the media library. The only time you will need the .image
      class is for scenarios such as full screen background images or Hero elements where the height will change
      fluidly with resize.
  */

  // Sizes. 412 and 1350 are sizes used for Google page speed
  const imageSizes = [375, 412, 640, 768, 1024, 1280, 1350, 1441, 1920];

  const all = imageSizes.map(imageSize => {
    // Update 768 if md breakpoint is not 768 and add additional breakpoints as nessasary
    const width = imageSize < 768 ? smWidth : mdWidth;
    let size = Math.round(width);
    if (responsiveWidth) {
      /*
        For responsive image widths we need to calculate the percentage of width based on sm/md breakpoint. on figma
      */
      const widthForCalc = imageSize < 768 ? 375 : 1440;
      size = Math.round(width / widthForCalc * imageSize);
    }
    return `(max-width: ${imageSize}px) ${size}px`;
  });

  const sizes = all.join(', ');

  if (['image/svg+xml', 'image/gif'].includes(mimeType)) {
    return (
      <img
        src={url}
        alt={alt ?? ''}
        title={title ?? ''}
        loading={lazy ? 'lazy' : ''}
        className={`w-full ${className}`}
        width={width ?? ''}
        height={height ?? ''}
        style={style}
      />
    );
  }

  if (smWidth && mdWidth && responsiveImage) {
    return (
      <Image
        data={{ ...responsiveImage }}
        lazyLoad={lazy}
        sizes={sizes}
        layout={layout}
        intersectionMargin={lazy ? '0px 100px 0px 0px' : '0px 0px 0px 0px'}
        fadeInDuration={lazy ? 500 : 0}
        usePlaceholder={!lazy ? false : usePlaceholder}
        className={className}
        style={{ '--object-position': focalPoint ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%` : '50% 50%' }}
      />
    );
  }

  return (
    <p>
      You must specify smWidth and mdWidth (use px values from designs, e.g.
      { 'mdWidth={500}' }
)
    </p>
  );
}
