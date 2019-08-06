import koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import { buildRoutes } from 'koa-decorative';

import logger from './lib/logger';
import './controllers';

const app = new koa();

app.use(koaBodyparser());

app.use(buildRoutes());

const port = process.env.PORT || 5000;
app.listen(port, () => logger.info(`Started server on port ${port}...`));
