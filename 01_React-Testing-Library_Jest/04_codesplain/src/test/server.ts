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

export type MaybePromise<T> = T | Promise<T>;

interface ServerConfig {
  method?: string;
  path: string;
  res: (
    req: RestRequest<never, PathParams<string>>,
    res: ResponseComposition<DefaultBodyType>,
    ctx: RestContext
  ) => MaybePromise<MockedResponse<DefaultBodyType>>;
}

export function createServer(handlerConfig: ServerConfig[]): void {
  const handlers = handlerConfig.map((config: ServerConfig) => {
    // console.log("config:", config);

    const method = (config?.method || "get") as string;

    return (rest as any)[method](
      config.path,
      (req: RestRequest<never, PathParams<string>>, res: ResponseComposition<DefaultBodyType>, ctx: RestContext) => {
        // console.log("ctx:", ctx);
        return res(ctx.json(config.res(req, res, ctx)));
      }
    );
  }) as Array<RequestHandler>;

  const server: SetupServer = setupServer(...handlers);
  // console.log("server:", server);

  beforeAll((): void => {
    server.listen();
  });
  afterEach((): void => {
    server.resetHandlers();
  });
  afterAll((): void => {
    server.close();
  });
}
