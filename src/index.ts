import express from 'express';
import { createAppRouter } from './server/server';

async function main() {
  let app = createAppRouter();

  let appWithHMR: any = app;

  if (module.hot) {
    appWithHMR = (req: Request, res: Response) => (app as any).handle(req, res);
    module.hot.accept('./server/server', () => {
      // eslint-disable-next-line no-console
      console.log(`[ Server-side HMR ] Reloading server...`);
      try {
        const { createAppRouter } = require('./server/server');
        app = createAppRouter();
      } catch (error) {
        console.error(error);
      }
    });
    // eslint-disable-next-line no-console
    console.info(`[ Server-side HMR ] Enabled!`);
  }

  express()
    .enable('trust proxy')
    .disable('etag')
    .disable('x-powered-by')
    .use(appWithHMR)
    .listen(3000, '127.0.0.1', () => {
      // eslint-disable-next-line no-console
      console.log(`\nServer listening on port 300`);
    });
}

main().catch(error => {
  console.error(error)
})
