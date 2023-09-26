import { Request } from 'express';
import { RequestHandler } from 'express-serve-static-core';

export type IController =  {
  middleware: RequestHandler|RequestHandler[];
  controller: RequestHandler
} | RequestHandler;

export interface IRoute {
  get?: Record<string, IController>,
  post?: Record<string, IController>,
}
