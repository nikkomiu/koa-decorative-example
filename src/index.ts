import koa from 'koa';
import koaBodyParser from 'koa-bodyparser';
import { defaultRouteManager } from 'koa-decorative';

import './controllers';

const app = new koa();

app.use(koaBodyParser());

app.use(defaultRouteManager.build());

app.listen(process.env.PORT || 5000);
