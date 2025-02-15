import { useRouter } from 'next/router';
import cn from '@/assets/js/cn';

export default function WysiwygContent({
  className ='',
  content = '',
}) {
  const router = useRouter();

  function checkLinks(e) {
    if (e.target.getAttribute('href') || e.target.parentNode.getAttribute('href')) {
      const href = e.target.parentNode.getAttribute('href') ? e.target.parentNode.getAttribute('href') : e.target.getAttribute('href');

      if (href.includes('datocms-assets') || href.includes('mailto:') || href.includes('tel:') || e.target.getAttribute('target') === '_blank') {
        return;
      }

      if ((href.includes('https://') || href.includes('http://')) && !href.includes('/datocms-assets/') && !href.includes('#')) {
        const url = new URL(href);
        if (url.origin === window.location.origin) {
          e.preventDefault();
          router.push(href.replace(url.origin, ''), undefined, { scroll: false });
        }
      } else {
        e.preventDefault();
        router.push(href, undefined, { scroll: false });
      }
    }
  }

  return (
    <>
      <div
        className={cn('wysiwyg', className)}
        onClick={checkLinks}
        dangerouslySetInnerHTML={{ __html: `${content}` }}
      />

      <style jsx global>
        {
          `
      .wysiwyg {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          // TODO heading styles
          margin-bottom: 0.5em;
        }

        p,
        ul,
        ol {
          &:not(:last-child) {
            margin-bottom: 1.25em;
          }
        }

        a {
          text-decoration: underline;

          &:hover {
            // TODO link hover styles
          }
        }

        strong {
          font-weight: 700;
        }

        ul {
          list-style: disc;
        }

        ol {
          list-style: decimal;
        }

        ul,
        ol {
          padding-left: 25px;
        }
      }
    `
        }
      </style>
    </>
  );
}
