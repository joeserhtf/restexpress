"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import controller querys
const scController_1 = require("../controllers/scController");
class DataRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', scController_1.scController.list);
        this.router.get('/h/', scController_1.scController.listh);
        this.router.post('/', scController_1.scController.create);
        this.router.put('/:id', scController_1.scController.update);
        this.router.delete('/:id', scController_1.scController.delete);
    }
}
const dataRoutes = new DataRoutes();
exports.default = dataRoutes.router;
