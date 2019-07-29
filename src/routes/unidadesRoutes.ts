import express, { Router } from 'express';

import unidadesController from '../controllers/unidadesController';

class unidadesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', unidadesController.get);
        this.router.put('/:id', unidadesController.update);
    }

}

const UnidadesRoutes = new unidadesRoutes();
export default UnidadesRoutes.router;

