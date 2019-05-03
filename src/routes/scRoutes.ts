import express, { Router } from 'express';

//import controller querys
import { scController } from '../controllers/scController';

class DataRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', scController.list);
        this.router.get('/h/', scController.listh);
        this.router.post('/', scController.create);
        this.router.put('/:id', scController.update);
        this.router.delete('/:id', scController.delete);
    }

}

const dataRoutes = new DataRoutes();
export default dataRoutes.router;