import { Context } from 'koa';

import TestController from './TestController';

describe('TestController', () => {
  let controller: TestController;

  beforeEach(() => {
    controller = new TestController();
  });

  it('renders about', () => {
    // Arrange
    const context = {} as Context;

    // Act
    controller.about(context);

    // Assert
    expect(context.body).toEqual({
      data: 'this is an example api for koa decorative',
    });
  });

  it('renders createThing', () => {
    // Arrange
    const query = { qparam: 'test' };
    const body = { bparam: 'test2' };
    const context = { request: { query, body } } as Context;

    // Act
    controller.createThing(context);

    // Assert
    expect(context.body).toEqual({ data: { ...query, ...body } });
  });
});
