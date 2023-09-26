import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import path from 'path';
import { IController, IRoute } from '../../types/app';

function registerControllersByPath(router: Router) {
  const context = require.context('./controllers/', true, /\.controller\.ts$/);
  context.keys().forEach((filePath: string) => {
    const controllerName = path.basename(filePath, '.controller.ts');
    const controllerPath = controllerName === 'main' ? '' : controllerName;

    const fileDir = path.dirname(filePath.substring(2));
    const namespace = (fileDir === '.' ? '' : `${fileDir}/`);

    const moduleContent: { route: IRoute } = context(filePath);
    Object.entries(moduleContent.route).forEach(([methodType, controllers]) => {
      Object.entries(controllers).forEach(([controllerSpecificUri, handler]: any) => {
        if (methodType in router) {
          const route = path.resolve(`/${namespace}${controllerPath}${controllerSpecificUri}`);
          if ('middleware' in handler && 'controller' in handler) {
            (router as any)[methodType](route, ([] as IController[]).concat(handler.middleware).map(middleware => asyncHandler(middleware as any)), asyncHandler(handler.controller));
          } else {
            (router as any)[methodType](route, asyncHandler(handler));
          }
        }
      });
    });
  });
}

function unSupportedAction(_req: Request, res: Response) {
  res.status(404).send('common:ERROR.UNSUPPORTED_ACTION');
}

export function getControllers() {
  const router = Router();

  registerControllersByPath(router);

  router.use(unSupportedAction);

  return router;
}
