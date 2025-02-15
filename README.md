# Next Dato CMS Template

## New Project Setup Checklist (from CMS template)
1. Click the button below to clone the CMS template:

[![Clone DatoCMS project](https://dashboard.datocms.com/clone/button.svg)](https://dashboard.datocms.com/clone?projectId=85411&name=HF+Template)

2. Click the green "use this template" button on this repo.
3. Shopify site? You'll need to promote the `shopify` branch to the default branch, delete `main` (and any other branches) and then rename `shopify` to `main`. (If not - you can delete the shopify branch). See the section on Shopify notes.
4. Clone down your repo and open in PhpStorm.
5. Run `yarn` to install packages. If PhpStorm asks if you want to run the Webpack configuration for the project, select "Trust project and run".
6. Open the datocms.json file at the project root and update the name, description and datocmsProjectId (you can find this under Project Information, before you enter the project in your Dato account). Push to git.
7. Open terminal and run `npx nanoid` twice.
8. Create a .env file by duplicating .env.example and renaming it. Copy the two random letter/number strings created from terminal and join them together for the PREVIEW_SECRET value do the same for CRON_SECRET.
9. In Dato, go to Settings > API tokens and copy the API key from your Frontend token. Paste this in your .env file as NEXT_PUBLIC_ENV_DATOCMS_API_TOKEN. Copy the Full Access token and use this for DATOCMS_FULLACCESS_TOKEN (note: this is purely used for environment backups and should not be used to query content, hence the need for a separate env for the frontend token)
10. Note for Shopify sites: You'll need to delete the pages/products directory and push before your first deploy - you can revert the commit and push again after a successful build. This is because the product page generation relies on the /api/shopify routes already existing, which they don't yet!
10. Create a new project in Vercel with your repo. Be sure to add your env variables! Leave the build command etc. as default.
11. Once it's deployed, be sure to update your NEXT_PUBLIC_SITE_URL env to the url Vercel has generated (everywhere it's referenced!).
12. Add the preview webhook URL in Dato (Configuraton > Plugins > Web Previews > Previews webhook URL). The URL will be https://DOMAIN/api/preview-links
12. Go to https://vercel.com/dashboard/hamblyfreeman/integrations and Manage the DatoCMS settings. Scroll down and click Manage Access, and add your Vercel project to the list.
13. Go to Build triggers in your Dato project and add a new Vercel trigger (call it Vercel). Add in your frontend URL and toggle on "Automatically trigger a build...". Hit Link to Vercel project.
14. Done! :tada:

## Shopify Notes:
- If you need test data, we have a dev shop at hfdev-shop.myshopify.com that you can pull credentials from.
- To update the shop the data is being pulled from, edit the shop url in src/lib/shopify-init.js

# ❗Don't forget...
- Always set a max upload limit of 5 mb on images, and ideally limit file type too
- Limit all long-form text fields (WYSIWYGs) as much as possible:
  ![image](https://user-images.githubusercontent.com/33719860/232462157-ff5d76fa-d9df-458b-af78-a1635e0c3178.png)
- Always add `smWidth`, `mdWidth`, `smAspectRatio` and `mdAspectRatio` props when using SiteImage to keep images optimised
- When creating a new model (post type), be sure to update "Content permissions" for Frontend in Dato and add your new model (View permissions only). Make sure you add in an SEO field.
- Update the URL prefix on each slug field in the Presentation tab - nobody likes an example.com :vomiting_face:
- Add a screenshot of your block in the block's help text
- Fork the main environment regularly to make backups
![image](https://user-images.githubusercontent.com/33719860/232462661-63ef4ed2-4f94-4ad5-91b0-e910c5f98b35.png)


## Collaborator Setup
1. Clone the repo
1. Run `yarn` to install dependencies
1. Copy .env.example, removing .example from the file extension. Ask another member of the team for the env variables.
1. Run `yarn dev` to get coding :tada:

## Go-live checklist
- [ ] Update NEXT_PUBLIC_SITE_URL to the live domain (make sure there's no trailing slash!)
- [ ] Update preview webhook URL in Dato to use the live domain (Configuraton > Plugins > Web Previews > Previews webhook URL)
- [ ] Search for "TODO" in the repo and update code for production where needed 
- [ ] Ensure sitemaps are working
- [ ] Ensure previews are working
- [ ] Add client's Google Analytics or Google Tag Manager code if applicable
- [ ] Remove unnecessary console.logs
- [ ] Make sure Example Block and Grid Visualiser have been removed

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
