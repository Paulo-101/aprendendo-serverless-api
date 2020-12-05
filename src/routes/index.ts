import { Router } from 'express';
//import bodyParser from 'body-parser';
//import helmet from 'helmet';
import cors from 'cors';
import consign from 'consign';
import usersRouter from './users.routes';
import loginRouter from './login.routes';

const routes = Router();

routes.use('/createuser', usersRouter);
routes.use('/logon', loginRouter);
routes.use(cors());
//routes.use(helmet());
//routes.use(bodyParser.urlencoded({ extended: true }));
//routes.use(bodyParser.json());

consign()
    .include('routes')
    .into(routes)

export default routes;