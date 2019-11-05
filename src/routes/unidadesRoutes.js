"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const unidadesController_1 = __importDefault(require("../controllers/unidadesController"));
class unidadesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', unidadesController_1.default.get);
        this.router.get('/s/', unidadesController_1.default.getS);
        this.router.put('/:id', unidadesController_1.default.update);
        this.router.put('/s/:id', unidadesController_1.default.updateS);
        this.router.put('/all/:id', unidadesController_1.default.updateAll);
    }
}
const UnidadesRoutes = new unidadesRoutes();
exports.default = UnidadesRoutes.router;
