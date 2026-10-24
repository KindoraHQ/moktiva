# Mokita VPN

Persian RTL static website for Mokita VPN and introductions to its music and group-management Telegram services.

- Existing repository: `KindoraHQ/moktiva` (unchanged identity).
- Hosting: https://moktiva.netlify.app/ on the existing Netlify project.
- Production branch: `main`; no framework, package installation or build command required.
- Publish directory: repository root. `netlify.toml` configures this explicitly.
- No custom domain, DNS change, server integration, analytics, forms or payment processing.

## Local preview

Run `python -m http.server 4187 --bind 127.0.0.1` from this directory and open `http://127.0.0.1:4187/`.

## Editing

`index.html`: page content. `styles.css`: layout and locally hosted Vazirmatn. `app.js`: platform filters, guides, dialogs and menu. `assets/mark.svg`: original geometric Mokita monogram.

Telegram purchase contact confirmed by the owner: https://t.me/KindoTeam (Mr. Mansour). Payment methods: USDT, ETH, BTC, USDC by prior coordination; Owner-approved receiving addresses are published for ETH/USDT/USDC on Ethereum and TRX and owner-confirmed USDT-TRC20 on TRON, plus BTC on Bitcoin mainnet. USDC-on-TRON is not offered (Circle discontinued support). There is no on-site checkout, automatic payment confirmation or fixed pricing. Plans and refund commitments remain pending confirmation. Ava is excluded from the public service offering. Never insert guessed contact details, user VPN configurations, keys, UUIDs, subscription URLs or administrative endpoints. Telegram sections are descriptions only and do not connect to live services.

Before enabling sales: obtain confirmed plans, delivery workflow and reviewed policies. Update the public copy and verify all links. The hosting privacy explanation describes this website, not VPN traffic logging.

## Deployment and rollback

Push the reviewed commit to the existing `main` branch to trigger Netlify. Confirm the deployed commit and public HTTP response. Do not change project visibility, domain settings or nameservers.

Rollback by republishing the previous successful Netlify deployment, or revert the website commit in Git and push. Original pre-redesign source commit: `97b0ba241cb78b2d45fcecf197ee74b93c43fceb`. A verified full source/history backup is maintained outside this repository in the workspace private backup directory. No VPN services are involved in website rollback.

## Sources and assets

Download links checked against original Hiddify / 2dust GitHub repositories and Apple App Store listings. Client guides are practical summaries; option names vary across versions. Do not claim every client feature was tested on a physical device.

Vazirmatn: https://github.com/rastikerdar/vazirmatn — SIL Open Font License, bundled in `assets/OFL.txt`. Original site illustrations use SVG/CSS and include no reference-site assets.

## Usability and discovery update

Payment method selector defaults to rial coordination; crypto panels show one network at a time, with local QR SVGs containing only the receiving address (no amount or automatic transfer). Canonical, social metadata, robots.txt, sitemap.xml and three standalone Persian device guides use only the netlify.app hostname. No Search Console account was connected and indexing/ranking is not guaranteed. Guides contain explicitly labeled original schematic illustrations rather than fabricated app screenshots. Unknown prices, hours and refund terms remain a pre-payment checklist, not promises.


### Display preference
The day/night switch follows system appearance on first visit. Explicit choices are stored locally under `mokita-theme`, shared by the homepage and guides, and never sent to a server. The standalone early `theme.js` avoids a theme flash and works within the existing CSP.

Download cards link directly to official release assets for Hiddify Android universal APK / Windows x64 Setup and v2rayN Windows x64 ZIP. These use stable latest/download asset names. v2rayNG Android universal APK is pinned to 2.3.11 because the filename includes its version; update that URL when choosing a new verified release. iOS cards link directly to their App Store app pages. No installer binaries are hosted or committed to this repository.
