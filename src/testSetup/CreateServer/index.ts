import { setupServer, type SetupServerApi } from 'msw/node';
import { rest } from 'msw';

const createServer = ({
  endpoint = 'https://jsonplaceholder.typicode.com/todos/1',
  response = {},
}): SetupServerApi => setupServer(rest.get(endpoint, (_req, res, ctx) => res(ctx.json(response))));

export default createServer;
