import express, { Router } from 'express';

import oclController from '../controllers/oclController';

class oclRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', oclController.get);
        this.router.get('/cxs', oclController.getcx);
        this.router.post('/rcd', oclController.getrcd);
        this.router.post('/orc', oclController.getorc);
        this.router.post('/prod', oclController.getprod);
    }

}

const OclRoutes = new oclRoutes();
export default OclRoutes.router;

