import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Routes
import atendimentoRoutes from './routes/atendimentoRoutes';
import colaboradorRoutes from './routes/colaboradorRoutes';
import timesheetRoutes from './routes/timesheetRoutes';
import projetoRoutes from './routes/projetoRoutes';
import inventarioRoutes from './routes/inventarioRoutes';
import dataRoutes from './routes/dataRoutes';
import custfixoRoutes from './routes/custfixoRoutes';
import loginRoutes from './routes/loginRoutes';

class Server {

    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 21181);

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use('/', atendimentoRoutes); //Atendentes
        this.app.use('/api/colab', colaboradorRoutes); //colaboradores
        this.app.use('/api/time', timesheetRoutes); //timesheet
        this.app.use('/api/proj', projetoRoutes); //projetos
        this.app.use('/api/inv', inventarioRoutes); //inventario
        this.app.use('/api/data', dataRoutes); //dataapi
        this.app.use('/api/cf', custfixoRoutes); //cfs
        this.app.use('/api/auth', loginRoutes); //auth (login etc..)
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();