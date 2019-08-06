import { Context } from 'koa';
import { Controller, Get, Post, Put, Patch, Delete } from 'koa-decorative';

import { IResourceService } from '../services/interfaces';

@Controller('/resource')
class ResourceController {
  constructor(private resourceService: IResourceService) { }

  @Get()
  list(ctx: Context) {
    const items = this.resourceService.list();

    ctx.body = { data: items };
  }

  @Post()
  create(ctx: Context) {
    // TODO: replace crude body validation
    const { name, description } = ctx.request.body;
    if (!name || !description) {
      ctx.throw(400, 'name and description required');
    }

    const item = this.resourceService.create({ name, description });

    ctx.status = 201;
    ctx.body = { data: item };
  }

  @Get('/:id')
  detail(ctx: Context) {
    try {
      const item = this.resourceService.detail(ctx.params.id);

      ctx.body = { data: item };
    } catch {
      ctx.throw(404);
    }
  }

  @Put('/:id')
  @Patch('/:id')
  update(ctx: Context) {
    const action = ctx.request.method === 'put' ? 'replace' : 'update';

    try {
      const item = this.resourceService[action](ctx.params.id, ctx.request.body);

      ctx.body = { data: item };
    } catch {
      ctx.throw(404);
    }
  }

  @Delete('/:id')
  delete(ctx: Context) {
    try {
      const item = this.resourceService.delete(ctx.params.id);

      ctx.body = { data: item };
    } catch {
      ctx.status = 204;
    }
  }
}

export default ResourceController;
