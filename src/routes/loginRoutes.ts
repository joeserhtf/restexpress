import express, { Router } from 'express';

import loginController from '../controllers/loginController';

class LoginRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', loginController.list);
        this.router.post('/login', loginController.login);
        this.router.post('/', loginController.create);
    }

}
const loginRoutes = new LoginRoutes();
export default loginRoutes.router;

