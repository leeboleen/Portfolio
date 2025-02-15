import { request } from '@/lib/datocms.mjs';
import { atom } from 'recoil';
import gql from 'graphql-tag';

export const getSiteSettings = async() => {
  return await request({
    query: gql`{
          _site {
            noIndex
            favicon: faviconMetaTags {
              attributes
            }
          }
        }`,
  });
};

export const siteSettingsState = atom({
  key: 'siteSettingsState',
  default: [],
});

export const scrollLockState = atom({
  key: 'scrollLockState',
  default: false,
});

export const scrolledDistanceState = atom({
  key: 'scrolledDistanceState',
  default: 0,
});

