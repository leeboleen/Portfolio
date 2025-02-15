import { slugPrepend } from '@/lib/util';

const generatePreviewUrl = ({ item, itemType }) => {
  const prepend = slugPrepend(itemType.attributes.api_key);
  return itemType.attributes.api_key === 'page' && item.attributes.slug === 'homepage' ? '/' : item.meta.status === 'draft' ? `/${prepend}draft&slug=${item.attributes.slug}` : `/${prepend}${item.attributes.slug}`;
};

const handler = (req, res) => {
  // setup CORS permissions
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  // This will allow OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok');
  }

  const url = generatePreviewUrl(req.body);

  if (!url) {
    return res.status(200).json({ previewLinks: [] });
  }

  const previewLinks = [
    {
      label: 'Published version',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${url}`,
    },
    {
      label: 'Draft version',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/preview?redirect=${url}&secret=${process.env.PREVIEW_SECRET}`,
    },
  ];

  return res.status(200).json({ previewLinks });
};

export default handler;
