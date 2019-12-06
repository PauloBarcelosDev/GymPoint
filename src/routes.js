import { Router } from "express";
import StudentsControllers from './app/controllers/studentsController';
import SessionControllers from './app/controllers/SessionController';
import authMiddlware from './app/middleware/auth';

const routes = new Router();

routes.post ('/sessions', SessionControllers.store );

routes.use(authMiddlware);

routes.post ('/students', StudentsControllers.store );
routes.put ('/students', StudentsControllers.update );

export default routes;
