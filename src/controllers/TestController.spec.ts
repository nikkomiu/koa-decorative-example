import { Context } from 'koa';

import TestController from './TestController';

describe('TestController', () => {
  let controller: TestController;

  beforeEach(() => {
    controller = new TestController();
  });

  it('renders about', () => {
    // Arrange
    const ctx = {} as Context;

    // Act
    controller.about(ctx);

    // Assert
    expect(ctx.body).toEqual({
      data: 'this is an example api for koa decorative',
    });
  });

  it('renders createThing', () => {
    // Arrange
    const query = { qparam: 'test' };
    const body = { bparam: 'test2' };
    const ctx = { request: { query, body } } as Context;

    // Act
    controller.createThing(ctx);

    // Assert
    expect(ctx.body).toEqual({ data: { ...query, ...body } });
  });
});
