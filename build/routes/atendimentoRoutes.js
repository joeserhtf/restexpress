"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import controller querys
const atendimentoController_1 = require("../controllers/atendimentoController");
class AtendimentoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', atendimentoController_1.atendimentoController.get);
        this.router.put('/:id', atendimentoController_1.atendimentoController.update);
    }
}
const atendimentoRoutes = new AtendimentoRoutes();
exports.default = atendimentoRoutes.router;
