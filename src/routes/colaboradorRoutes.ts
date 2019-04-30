import express, { Router } from 'express';

import colaboradorController from '../controllers/colaboradorController';

class ColaboradorRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', colaboradorController.get);
        this.router.post('/', colaboradorController.create);
        this.router.put('/:id', colaboradorController.update);
    }

}

const colaboradorRoutes = new ColaboradorRoutes();
export default colaboradorRoutes.router;

