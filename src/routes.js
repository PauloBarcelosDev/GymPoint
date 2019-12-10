import { Router } from "express";
import authMiddlware from './app/middleware/auth';
import StudentsControllers from './app/controllers/studentsController';
import SessionControllers from './app/controllers/SessionController';
import PlansControllers from './app/controllers/PlansController';
import registrationControllers from './app/controllers/registrationController'



const routes = new Router();

routes.post ('/sessions', SessionControllers.store );

routes.use(authMiddlware);

routes.post ('/students', StudentsControllers.store );
routes.put ('/students', StudentsControllers.update );

routes.post ('/plans', PlansControllers.store );
routes.put ('/plans/:id', PlansControllers.update );
routes.get ('/plans', PlansControllers.index );
routes.delete ('/plans/:id', PlansControllers.delete );

routes.post ('/registration', registrationControllers.store);
routes.get ('/registration', registrationControllers.index );
routes.get ('/registration/:studentsId', registrationControllers.indexStudents);
routes.put ('/registration/:id', registrationControllers.update );
routes.delete ('/registration/:id', registrationControllers.delete );

export default routes;
