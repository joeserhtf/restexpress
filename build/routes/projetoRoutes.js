"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import controller querys
const projetoController_1 = require("../controllers/projetoController");
class ProjetoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', projetoController_1.projetoController.list);
        this.router.post('/', projetoController_1.projetoController.create);
        this.router.put('/:id', projetoController_1.projetoController.update);
    }
}
const projetoRoutes = new ProjetoRoutes();
exports.default = projetoRoutes.router;
