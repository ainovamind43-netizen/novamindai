/**
 * Adds the Hostinger-specific files to ./dist after `vite build`.
 *
 * Nitro's node-server bundle is self-contained and runs as
 * `node dist/server/index.mjs`, but Hostinger's hPanel Node.js setup asks for a
 * startup file in the application root and takes `.js`. It also needs the
 * package to be marked as ESM for that file to use `import`.
 *
 * These are generated here rather than committed into dist/ because `vite build`
 * clears the directory on every run.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const files = {
  "package.json": `${JSON.stringify(
    {
      name: "novamindai",
      version: "1.0.0",
      private: true,
      type: "module",
      main: "app.js",
      scripts: { start: "node app.js" },
    },
    null,
    2,
  )}\n`,

  // Hostinger hPanel → Advanced → Node.js asks for a startup file. Passenger
  // loads it and the import starts the HTTP listener.
  "app.js": `// Hostinger Node.js startup file. See README-DEPLOY.txt.
import "./server/index.mjs";
`,

  "README-DEPLOY.txt": `NovaMind AI — Hostinger deployment
===================================

WHAT THIS IS
  A self-contained Node.js server (SSR). No npm install is needed — all
  dependencies are already bundled inside ./server.

REQUIREMENTS
  Your Hostinger plan MUST support Node.js. Shared "Web Hosting" plans
  (Single / Premium / Business with only File Manager + PHP) CANNOT run this.
  You need a VPS, or a plan with the hPanel "Node.js" section.

UPLOAD
  1. Upload the CONTENTS of this folder (not the folder itself) into your
     application root — e.g. public_html for the main domain.
     Result: public_html/server/index.mjs, public_html/app.js, ...

  2. hPanel -> Advanced -> Node.js  (or "Setup Node.js App")
       Node version      : 20.x or newer
       Application root  : the folder you uploaded into
       Application URL   : novamindai.info
       Startup file      : app.js
     Then click "Run NPM Install" is NOT needed (no dependencies), and
     click Restart.

  3. Point novamindai.info at this app in hPanel -> Domains, then issue the
     free SSL certificate.

WITHOUT hPanel NODE.JS (VPS)
  cd <app root>
  PORT=3000 node server/index.mjs
  Keep it alive with pm2:
    npm i -g pm2
    PORT=3000 pm2 start server/index.mjs --name novamindai
    pm2 save && pm2 startup
  Then put nginx in front of 127.0.0.1:3000 and run certbot for SSL.

ENVIRONMENT
  PORT   - port to listen on (default 3000). Hostinger/Passenger sets this.
  HOST   - bind address (default 0.0.0.0).

VERIFY AFTER DEPLOY
  /            homepage
  /services    services
  /about       about
  /contact     contact + WhatsApp form
  /favicon.svg static asset

NOTES
  - This build is server-rendered, which is what you want for SEO.
  - The contact form opens WhatsApp; it does not email anyone.
`,
};

for (const [name, body] of Object.entries(files)) {
  writeFileSync(join(dist, name), body, "utf8");
  console.log(`[deploy] wrote dist/${name}`);
}
