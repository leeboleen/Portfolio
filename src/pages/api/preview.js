export default async(req, res) => {
  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  } else {
    res.setPreviewData({});
    res.writeHead(307, { Location: `${req.query.redirect}${req.query.slug ? `?realSlug=${req.query.slug}` : '' }` });
    res.end('Preview mode enabled');
  }
};
