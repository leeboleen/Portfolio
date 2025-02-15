import { request } from './src/lib/datocms.mjs';
import gql from 'graphql-tag';

const query = (limit, skip) => gql`
  query {
    allRedirects(first: ${limit}, skip: ${skip}) {
      from
      to
      temporary
    }
  }
`;

/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['www.datocms-assets.com'],
  },

  async redirects() {
    const limit = 100;
    let skip = 0;
    let keepQuerying = true;
    let allRedirects = [];

    // We make an API call to gather the URLs for our site
    while (keepQuerying) {
      const data = await request({
        query: query(limit, skip),
      });

      allRedirects = allRedirects.concat(data.allRedirects);
      skip += limit;

      if (data.allRedirects.length < limit) {
        keepQuerying = false;
      }
    }

    const mappedRedirects = allRedirects.map(({ from, to, temporary }) => ({ source: `${from}`, destination: `${to}`, permanent: !temporary }));

    return mappedRedirects || [];
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
