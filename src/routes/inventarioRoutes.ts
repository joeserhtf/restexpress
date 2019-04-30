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
        this.router.post('/', inventarioController.create);
        this.router.put('/:id', inventarioController.update);
    }

}

const inventarioRoutes = new InventarioRoutes();
export default inventarioRoutes.router;