const process = require('process');
const fs = require('fs');

fs.readdirSync('./src/pages/', { recursive: true }).forEach(file => {
  if (file.includes('/[')) {
    const fileContents = fs.readFileSync(`./src/pages/${file}`, { encoding: 'utf-8' });
    const isDatoModel = fileContents.includes('datocms.mjs');

    if (isDatoModel) {
      const fileSplit = file.split('/');

      const sitemapExists = fs.existsSync(`./src/pages/sitemap-${fileSplit[0]}.xml.js`);

      const sitemapIndexData = fs.readFileSync('./public/sitemap-index.xml', { encoding: 'utf-8' });
      const referencedInSitemapIndex = sitemapIndexData.includes(`sitemap-${fileSplit[0]}.xml`);

      const slugPrependData = fs.readFileSync('./src/lib/util.js', { encoding: 'utf-8' });
      const referencedInslugPrepend = slugPrependData.includes(`case '${fileSplit[0]}'`) || slugPrependData.includes(`case '${fileSplit[0].slice(0, -1)}'`);

      if (!sitemapExists || !referencedInSitemapIndex || !referencedInslugPrepend) {
        process.emitWarning(`\x1b[31m ⚠️ NEW MODEL DETECTED: ${fileSplit[0]} ⚠️ \x1b[0m`);
      }

      if (!sitemapExists) {
        process.emitWarning('\x1b[31m This model does not yet have a sitemap. \x1b[0m');
        process.emitWarning('\x1b[31m Please copy sitemap-pages.xml.js and refactor this for the new model. \x1b[0m');
      }

      if (!referencedInSitemapIndex) {
        process.emitWarning('\x1b[31m This models sitemap has not beed added to the sitemap index. \x1b[0m');
        process.emitWarning('\x1b[31m Please add sitemap url to /public/sitemap-index.xml \x1b[0m');
      }

      if (!referencedInslugPrepend) {
        process.emitWarning('\x1b[31m This model has not been referenced in slugPrepend for links. \x1b[0m');
        process.emitWarning('\x1b[31m Please add model to the slugPrepend function in /lib/util.js \x1b[0m');
      }
    }
  }
});

