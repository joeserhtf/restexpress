import express, { Router } from 'express';

import oclController from '../controllers/oclController';

class oclRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', oclController.getSL1);
    }

}

const OclRoutes = new oclRoutes();
export default OclRoutes.router;

