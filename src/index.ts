import dotenv from 'dotenv';
import express, { Express } from 'express';
import { errorHandlingMiddleware } from './middleware/errorHandlingMiddleware';
import { RegisterRoutes } from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDef from './documentation/swagger.json';
import { notFoundHandlingMiddleware } from './middleware/notFoundHandlingMiddleware';
import { requireApiToken } from './middleware/authMiddleware';
import cors from 'cors';

dotenv.config();

const app: Express = express();

app.use(
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  })
);

app.use(express.json());

app.use('/api/reference', swaggerUi.serve, swaggerUi.setup(swaggerDef));

app.use(requireApiToken);

RegisterRoutes(app);

app.use(notFoundHandlingMiddleware);
app.use(errorHandlingMiddleware);

export default app;
