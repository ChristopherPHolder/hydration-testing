import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// @ts-ignore
globalThis['route_exploration'] = true

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

// app.use(express.json());


/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', async (req, res, next) => {
  console.log('req', req.method, req.url);
  // const { socket, url = '', originalUrl, headers } = req;
  // const ngReq = { headers, socket, url, originalUrl, method: 'GET' };

  await angularApp
    .handle(req, { context: true})
    .then((response) => {
      if (response) {
        response.headers.set('x-ssr-bypass', '1');
        writeResponseToNodeResponse(response, res)
      } else {
        console.log('Response = ', response);
        next();
      }
    }
    )
    .catch(next);
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
