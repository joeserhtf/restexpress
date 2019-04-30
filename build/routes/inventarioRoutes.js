"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import controller querys
const inventarioController_1 = require("../controllers/inventarioController");
class InventarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', inventarioController_1.inventarioController.list);
        this.router.post('/', inventarioController_1.inventarioController.create);
        this.router.put('/:id', inventarioController_1.inventarioController.update);
    }
}
const inventarioRoutes = new InventarioRoutes();
exports.default = inventarioRoutes.router;
