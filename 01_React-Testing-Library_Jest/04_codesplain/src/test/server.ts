import { SetupServer, setupServer } from "msw/node";
import {
  DefaultBodyType,
  MockedResponse,
  PathParams,
  RequestHandler,
  ResponseComposition,
  rest,
  RestContext,
  RestRequest,
} from "msw";

interface ServerConfig {
  method?: string;
  path: string;
  res: (
    req: RestRequest<never, PathParams<string>>,
    res: ResponseComposition<DefaultBodyType>,
    ctx: RestContext
  ) => MaybePromise<MockedResponse<DefaultBodyType>>;
}

export function createServer(handlerConfig: [ServerConfig]) {
  const handlers = handlerConfig.map((config) => {
    const method = (config?.method! || "get") as string;

    return (rest as any)[method](
      config.path,
      (req: RestRequest<never, PathParams<string>>, res: ResponseComposition<DefaultBodyType>, ctx: RestContext) => {
        return res(ctx.json(config.res(req, res, ctx)));
      }
    );
  }) as Array<RequestHandler>;
  const server: SetupServer = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
}
