import { IRoute } from '../../../types/app';

export const route: IRoute = {
  get: {
    '/': (req, res) => {
      res.json({...req.query, test: 'xxx'});
    }
  }
};
