import express, { Router } from 'express';

//import controller querys
import { projetoController } from '../controllers/projetoController';

class ProjetoRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', projetoController.list);
        this.router.post('/', projetoController.create);
        this.router.put('/:id', projetoController.update);
    }

}

const projetoRoutes = new ProjetoRoutes();
export default projetoRoutes.router;