"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//Routes
const atendimentoRoutes_1 = __importDefault(require("./routes/atendimentoRoutes"));
const colaboradorRoutes_1 = __importDefault(require("./routes/colaboradorRoutes"));
const timesheetRoutes_1 = __importDefault(require("./routes/timesheetRoutes"));
const projetoRoutes_1 = __importDefault(require("./routes/projetoRoutes"));
const inventarioRoutes_1 = __importDefault(require("./routes/inventarioRoutes"));
const dataRoutes_1 = __importDefault(require("./routes/dataRoutes"));
const custfixoRoutes_1 = __importDefault(require("./routes/custfixoRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 21181);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', atendimentoRoutes_1.default); //Atendentes
        this.app.use('//api/colab', colaboradorRoutes_1.default); //colaboradores
        this.app.use('//api/time', timesheetRoutes_1.default); //timesheet
        this.app.use('//api/proj', projetoRoutes_1.default); //projetos
        this.app.use('//api/inv', inventarioRoutes_1.default); //inventario
        this.app.use('//api/data', dataRoutes_1.default); //dataapi
        this.app.use('//api/cf', custfixoRoutes_1.default); //cfs
        this.app.use('//api/auth', loginRoutes_1.default); //auth (login etc..)
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
