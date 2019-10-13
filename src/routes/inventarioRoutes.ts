import express, { Router } from 'express';

//import controller querys
import { inventarioController } from '../controllers/inventarioController';

class InventarioRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', inventarioController.list);
        this.router.get('/m/', inventarioController.listM);
        this.router.post('/', inventarioController.create);
        this.router.post('/m/', inventarioController.createM);
        this.router.put('/:id', inventarioController.update);
    }

}

const inventarioRoutes = new InventarioRoutes();
export default inventarioRoutes.router;