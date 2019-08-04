import ResourceController from './ResourceController';
import TestController from './TestController';

import * as services from '../services';

const resourceService = new services.ResourceService();

new ResourceController(resourceService);
new TestController();
