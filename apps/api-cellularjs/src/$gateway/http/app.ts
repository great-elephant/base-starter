import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { createNetWork, IRS, transportListener } from '@cellularjs/net';
import { getLogger } from '@cellularjs/logger';
import { netCnfs } from '$share/net';
import { createServer } from 'http';
import { env } from '$share/env';
import { configRoutes } from './routes';

export async function initApp() {
  await createNetWork(netCnfs);

  const app = express();
  const httpServer = createServer(app);
  const { CLIENT_BASE_URL } = env();
  app.use(cors({ credentials: true, origin: CLIENT_BASE_URL }));
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.disable('x-powered-by');
  app.use(express.static('./tmp'));

  configRoutes(app);

  // initWss(httpServer);

  return httpServer;
}

transportListener.on('fail', (ctx) => {
  if (!(ctx.originalError instanceof IRS)) {
    getLogger(ctx.irq.header.to).error(
      ctx.originalError?.stack || ctx.originalError,
    );
    return;
  }

  if (ctx.originalError.header.status < 400) return;
  const body = { ...ctx.originalError.body };
  body.errors && delete body.errors;

  getLogger(ctx.irq.header.to).error(JSON.stringify(body));
});

export interface X { }
