import express, { Router } from 'express';

import oclController from '../controllers/oclController';
import restController from '../controllers/restController';

class oclRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', oclController.gets);
        this.router.get('/fil', oclController.getfilial);
        this.router.get('/cnpj', restController.getCnpj);
		this.router.get('/relatorio', oclController.getRelatorio);
        this.router.get('/placa', oclController.getplaca);
		this.router.get('/datas', oclController.getdatas);
        this.router.get('/clientes', oclController.getClientes);
        this.router.get('/detalhecli', oclController.getDetalhesCliente);
        this.router.get('/ocorencias', oclController.getOcorrencias);
        this.router.get('/analisecli', oclController.getAnaliseCliente);
        this.router.post('/acomp', oclController.getAcomp);
        this.router.post('/prod', oclController.getprod);
    }

}

const OclRoutes = new oclRoutes();
export default OclRoutes.router;

