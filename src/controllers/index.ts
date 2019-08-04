import ResourceController from './ResourceController';
import TestController from './TestController';

import * as services from '../services';

const resourceService = new services.ResourceService();

export const resourceController = new ResourceController(resourceService);
export const testController = new TestController();
