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
        this.router.get('/orc/:id', projetoController.getOrc);
        this.router.get('/log/:id', projetoController.getLog);
        this.router.get('/:id', projetoController.getOne);
        this.router.post('/', projetoController.create);
        this.router.post('/orc', projetoController.createorc);
        this.router.post('/log', projetoController.createlog);
        this.router.put('/:id', projetoController.update);
    }

}

const projetoRoutes = new ProjetoRoutes();
export default projetoRoutes.router;