import express from 'express';

import { errorHandler } from '../middlewares/errorHandler';
import { loggerMiddleware } from '../middlewares/logger';
import { traceIdMiddleware } from '../middlewares/trace';
import routes from '../routes';
import healthCheckRouter from '../routes/healthCheckRoutes';
import { SERVICE_BASE_ROUTE } from '../utils/constant';
import { HttpErrorStatus } from '../utils/express/constants';
import { errorResponse, TExpressError } from '../utils/express/helpers';

const PORT = process.env.PORT || 8080;

const ERRORS: Record<string, TExpressError> = {
  default: {
    status: HttpErrorStatus.NotFound,
    message: 'Not Found',
    details: 'The requested resource could not be found but may be available again in the future.',
  },
};

export const initServer = async () => {
  const app = express();

  app.use(express.json({ limit: '50mb' }));
  app.use(
    express.urlencoded({
      extended: true,
      limit: '50mb',
    }),
  );

  app.disable('x-powered-by');

  // Middlewares
  app.use(traceIdMiddleware);
  app.use(loggerMiddleware);

  app.use('/health', healthCheckRouter);

  app.use(SERVICE_BASE_ROUTE, routes);

  app.use(errorHandler);

  // Wildcard route
  app.use('*', (_req, res) => errorResponse(ERRORS.default, res));

  app.listen(PORT, () => console.info('Express server is running on port', PORT));
};
