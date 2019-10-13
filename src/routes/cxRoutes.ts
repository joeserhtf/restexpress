import express, { Router } from 'express';

import cxController from '../controllers/CxController';

class cxRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', cxController.get);
    }

}

const CxRoutes = new cxRoutes();
export default CxRoutes.router;

