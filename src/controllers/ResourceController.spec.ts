import { Context } from 'koa';

import ResourceController from './ResourceController';
import { IResourceService } from '../services/interfaces';

describe('ResourceController', () => {
  let resourceService: IResourceService;
  let controller: ResourceController;
  const resourceServiceMocks = {
    list: jest.fn(),
    create: jest.fn(),
    detail: jest.fn(),
    update: jest.fn(),
    replace: jest.fn(),
    delete: jest.fn(),
  };

  const MockResourceService = jest.fn<IResourceService, any[]>(() => resourceServiceMocks);

  beforeEach(() => {
    jest.clearAllMocks();

    resourceService = new MockResourceService();
    controller = new ResourceController(resourceService);
  });

  it('can list resources', () => {
    // Arrange
    const ctx = {} as Context
    const items = [
      { id: 'one', name: 'first', description: 'first thing' },
      { id: 'two', name: 'second', description: 'second thing' },
    ];
    resourceServiceMocks.list.mockReturnValue(items);

    // Act
    controller.list(ctx);

    // Assert
    expect(ctx.body).toEqual({ data: items });
    expect(resourceServiceMocks.list).toHaveBeenCalledTimes(1);
  });

  it('can create a resource', () => {
    // Arrange
    const name = 'passed name';
    const description = 'passed description';
    const ctx = {
      request: { body: { name, description, id: 'passed id' } },
    } as Context;
    resourceServiceMocks.create.mockReturnValue({ name, description, id: 'set id' })

    // Act
    controller.create(ctx);

    // Assert
    expect(ctx.body).toEqual({ data: { name, description, id: 'set id' } });
    expect(resourceServiceMocks.create).toHaveBeenCalledTimes(1);
    expect(resourceServiceMocks.create).toHaveBeenCalledWith({ name, description });
  });

  it('returns an error when name is blank', () => {
    // Arrange
    const t = jest.fn();
    const ctx = {
      request: { body: { name: 'test' } },
      throw: t as any,
    } as Context;

    // Act
    controller.create(ctx);

    // Assert
    expect(t).toHaveBeenCalledWith(400, 'name and description required');
  });

  it('returns an error when description is blank', () => {
    // Arrange
    const ctx = {
      request: { body: { description: 'test' } },
      throw: jest.fn() as any,
    } as Context;

    // Act
    controller.create(ctx);

    // Assert
    expect(ctx.throw).toHaveBeenCalledWith(400, 'name and description required');
  });

  it('can show detail of a resource', () => {
    // Arrange
    const id = 4;
    const returnValue = { id: 'a', name: 'b', description: 'c' };
    const ctx = {
      params: { id },
    } as any;
    resourceServiceMocks.detail.mockReturnValue(returnValue);

    // Act
    controller.detail(ctx);

    // Assert
    expect(ctx.body).toEqual({ data: returnValue });
    expect(resourceServiceMocks.detail).toHaveBeenCalledWith(id);
  });

  it('returns 404 when service call throws for detail', () => {
    // Arrange
    const id = 4;
    const ctx = {
      params: { id },
      throw: jest.fn(),
    } as any;
    resourceServiceMocks.detail.mockImplementation(() => { throw new Error(); });

    // Act
    controller.detail(ctx);

    // Assert
    expect(ctx.throw).toHaveBeenCalledWith(404);
    expect(resourceServiceMocks.detail).toHaveBeenCalledWith(id);
  });

  it('can update a resource with put', () => {
    // Arrange
    const id = 5;
    const body = { name: 'test name', description: 'test desc' };
    const returnData = { id: 'test id', ...body };
    const ctx = {
      params: { id },
      request: { body, method: 'put' },
    } as any;
    resourceServiceMocks.replace.mockReturnValue(returnData);

    // Act
    controller.update(ctx);

    // Assert
    expect(ctx.body).toEqual({ data: returnData });
    expect(resourceServiceMocks.replace).toHaveBeenCalledWith(id, body);
    expect(resourceServiceMocks.update).not.toHaveBeenCalled();
  });

  it('can update a resource with patch', () => {
    // Arrange
    const id = 5;
    const body = { name: 'test name', description: 'test desc' };
    const returnData = { id: 'test id', ...body };
    const ctx = {
      params: { id },
      request: { body, method: 'patch' },
    } as any;
    resourceServiceMocks.update.mockReturnValue(returnData);

    // Act
    controller.update(ctx);

    // Assert
    expect(ctx.body).toEqual({ data: returnData });
    expect(resourceServiceMocks.update).toHaveBeenCalledWith(id, body);
    expect(resourceServiceMocks.replace).not.toHaveBeenCalled();
  });

  it('returns 404 when service call throws for update', () => {

  });

  it('can delete a resource', () => {

  });

  it('returns 204 when service call throws for delete', () => {

  });
});
