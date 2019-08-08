import { Context } from 'koa';
import { Controller, Get, Post } from 'koa-decorative';

@Controller()
class TestController {
  // GET /about
  @Get('/about')
  about(ctx: Context) {
    ctx.body = { data: 'this is an example api for koa decorative' };
  }

  // POST /test
  @Post('/test')
  createThing(ctx: Context) {
    ctx.body = {
      data: { ...ctx.request.query, ...ctx.request.body },
    };
  }
}

export default TestController;
