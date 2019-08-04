import koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import { defaultRouteManager } from 'koa-decorative';

import './controllers';

const app = new koa();

app.use(koaBodyparser());

app.use(defaultRouteManager.build());

app.listen(process.env.PORT || 5000);
