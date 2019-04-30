import express, { Router } from 'express';

//import controller querys
import { dataController } from '../controllers/dataController';

class DataRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', dataController.list);
        this.router.get('/ramal', dataController.ramal);
        this.router.post('/', dataController.create);
        this.router.put('/:id', dataController.update);
        this.router.delete('/:id', dataController.delete);
    }

}

const dataRoutes = new DataRoutes();
export default dataRoutes.router;