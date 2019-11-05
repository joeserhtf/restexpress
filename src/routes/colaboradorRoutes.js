"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const colaboradorController_1 = __importDefault(require("../controllers/colaboradorController"));
class ColaboradorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', colaboradorController_1.default.get);
        this.router.get('/u', colaboradorController_1.default.getU);
        this.router.get('/c', colaboradorController_1.default.getC);
        this.router.get('/s', colaboradorController_1.default.getS);
        this.router.post('/', colaboradorController_1.default.create);
        this.router.put('/:id', colaboradorController_1.default.update);
    }
}
const colaboradorRoutes = new ColaboradorRoutes();
exports.default = colaboradorRoutes.router;
