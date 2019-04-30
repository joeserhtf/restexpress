import express, { Router } from 'express';

//import controller querys
import { atendimentoController } from '../controllers/atendimentoController';

class AtendimentoRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', atendimentoController.get);
        this.router.put('/:id', atendimentoController.update);
    }

}

const atendimentoRoutes = new AtendimentoRoutes();
export default atendimentoRoutes.router;