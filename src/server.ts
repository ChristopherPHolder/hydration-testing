import {
  CommonEngine,
  createNodeRequestHandler,
  isMainModule,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';
import { APP_BASE_HREF } from '@angular/common';

import 'zone.js';
import { TEST_TOKEN } from './token';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
// WTF
const indexHtml = join(serverDistFolder, 'index.server.html');
const app = express();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

const DOC = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>SsrSetup</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
  <script src="polyfills.js" type="module"></script><script src="main.js" type="module"></script>
</body>
</html>
`
const commonEngine = new CommonEngine();

console.info('[Express]: Creating Web Server');

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {

  const { protocol, originalUrl, baseUrl, headers } = req;
  console.log('EXPRESS REQUEST', req.body);

    commonEngine
      .render({
        bootstrap: () => import('./main.server').then((m) => m.bootstrap()),
        document: DOC,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          { provide: TEST_TOKEN, useValue: 1 },
        ],

      })
      .then((html) => res.send(html))
      .catch((error) => next(error));
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
