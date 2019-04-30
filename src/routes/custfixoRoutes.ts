import express, { Router } from 'express';

import custofixoController from '../controllers/custfixoController';

class CustofixoRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', custofixoController.get);
        this.router.post('/', custofixoController.create);
        this.router.put('/:id', custofixoController.update);
    }

}

const custofixoRoutes = new CustofixoRoutes();
export default custofixoRoutes.router;