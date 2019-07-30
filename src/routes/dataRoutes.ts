import express, { Router } from 'express';

//import controller querys
import { dataController } from '../controllers/dataController';

class DataRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', dataController.listimp);
        this.router.get('/ramal', dataController.getramal);
        this.router.post('/', dataController.createimp);
        this.router.put('/', dataController.updateimp);
        this.router.delete('/:id', dataController.delete);
    }

}

const dataRoutes = new DataRoutes();
export default dataRoutes.router;