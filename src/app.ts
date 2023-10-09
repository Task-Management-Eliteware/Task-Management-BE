import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { appRoutes } from 'apis';
import { CommonRoutesConfig } from 'common/common.routes.config';
import { UserRoutes } from 'users/users.routes.config';

const app: Application = express();
const routes: Array<CommonRoutesConfig> = [];

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const userRoutes = new UserRoutes(app);
const route = userRoutes.configureRoutes();

routes.push(userRoutes);
const BasePath = process.env.BASE_API_PATH as string;

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send('runningMessage');
});
app.use(BasePath, route._router);

export { routes };
export default app;
