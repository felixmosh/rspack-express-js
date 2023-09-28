import { IRoute } from '../../../types/app';

export const route: IRoute = {
  get: {
    '/': (req, res) => {
      const x:string = 1;
      res.json({...req.query, test: 'test'});
    }
  }
};
