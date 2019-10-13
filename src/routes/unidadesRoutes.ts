import express, { Router } from 'express';

import unidadesController from '../controllers/unidadesController';

class unidadesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', unidadesController.get);
        this.router.get('/s/', unidadesController.getS);
        this.router.put('/:id', unidadesController.update);
        this.router.put('/s/:id', unidadesController.updateS);
        this.router.put('/all/:id', unidadesController.updateAll);
    }

}

const UnidadesRoutes = new unidadesRoutes();
export default UnidadesRoutes.router;

