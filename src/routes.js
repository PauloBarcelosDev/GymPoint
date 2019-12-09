import { Router } from "express";
import StudentsControllers from './app/controllers/studentsController';
import SessionControllers from './app/controllers/SessionController';
import PlansControllers from './app/controllers/PlansController';
import authMiddlware from './app/middleware/auth';


const routes = new Router();

routes.post ('/sessions', SessionControllers.store );

routes.use(authMiddlware);

routes.post ('/students', StudentsControllers.store );
routes.put ('/students', StudentsControllers.update );

routes.post ('/plans', PlansControllers.store );
routes.put ('/plans/:id', PlansControllers.update );
routes.get ('/plans', PlansControllers.index );
routes.delete ('/plans/:id', PlansControllers.delete );

export default routes;
