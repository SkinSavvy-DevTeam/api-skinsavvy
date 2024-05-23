import {ServerRoute} from '@hapi/hapi';

export interface ServerRouteSwagger extends ServerRoute {
  options: {
    tags: string[];
    description: string;
    notes: string;
  };
}
