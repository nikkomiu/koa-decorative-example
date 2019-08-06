import koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import { buildRoutes } from 'koa-decorative';

import './controllers';

const app = new koa();

app.use(koaBodyparser());

app.use(buildRoutes());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Started server on port ${port}...`));
