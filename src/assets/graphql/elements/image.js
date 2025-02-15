export default (width, height, label = null, autoHeight = false) => `
${label ? `${label}: ` : ''}responsiveImage(
  imgixParams: {w: "${width}", ${!autoHeight ? `crop: focalpoint, fit: crop,  h: "${height}"` : ''}, auto: format}
) {
  srcSet
  src
  width
  height
  alt
  title
  base64
}
alt
url
title
width
height
mimeType
focalPoint {
  x
  y
}`;
