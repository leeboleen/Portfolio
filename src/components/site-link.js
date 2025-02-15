import Link from 'next/link';
import { slugPrepend } from '@/lib/util';

export default function SiteLink({
  className = '',
  newTab = false,
  title = null,
  customUrl = null,
  linkType = 'internal',
  internalUrl = {},
  children,
  ariaLabel,
  onClick,
  append = '',
}) {
  const hasLink = !!((linkType === 'custom' && customUrl) || (linkType === 'internal' && internalUrl));
  let isException = false;

  if (hasLink && linkType === 'custom') {
    // check to see if the path should be excluded from remapped to
    isException = ['#', 'mailto:', 'tel:'].some(exception => {
      return customUrl.startsWith(exception);
    });
  }

  let remappedTo;

  if (hasLink) {
    if (linkType === 'custom') {
      if (isException) {
        remappedTo = customUrl;
      }

      const url = new URL(customUrl, process.env.NEXT_PUBLIC_SITE_URL);
      const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL);

      if (
        siteUrl.host.replace('www.', '') ===
        url.host.replace('www.', '')
      ) {
        // internal application link
        remappedTo = customUrl.replace(url.origin, '');
      } else {
        // external link
        remappedTo = customUrl;
      }
    } else if (internalUrl._modelApiKey) {
      remappedTo = `/${slugPrepend(internalUrl._modelApiKey)}${internalUrl.slug}`;
    }
  }

  const isAppLink = remappedTo && !isException && !remappedTo.startsWith('http');

  if (hasLink && isAppLink && !title) {
    return (
      <Link
        href={remappedTo + append}
        target={newTab ? '_blank' : null}
        className={className}
        aria-label={ariaLabel}
        onClick={onClick}
        scroll={false}
      >
        { children }
      </Link>
    );
  } else if (hasLink && isAppLink && title) {
    return (
      <Link
        href={remappedTo + append}
        target={newTab ? '_blank' : null}
        dangerouslySetInnerHTML={{ __html: title }}
        className={className}
        aria-label={ariaLabel}
        onClick={onClick}
        scroll={false}
      />
    );
  } else if (hasLink && title) {
    return (
      <a
        href={remappedTo + append}
        target={newTab ? '_blank' : null}
        dangerouslySetInnerHTML={{ __html: title }}
        rel="noreferrer"
        className={className}
        aria-label={ariaLabel}
      />
    );
  } else if (hasLink) {
    return (
      <a
        href={remappedTo + append}
        target={newTab ? '_blank' : null}
        rel="noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        { children }
      </a>
    );
  }
}
