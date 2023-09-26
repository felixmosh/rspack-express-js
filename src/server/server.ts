import { Router } from 'express';
import { getControllers } from './controllersLoader.ts';
import { handleErrors } from './handleErrors.ts';

export function createAppRouter() {


  return Router()
    .use('/', getControllers())

    .use(handleErrors);
}
