"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import controller querys
const dataController_1 = require("../controllers/dataController");
class DataRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', dataController_1.dataController.list);
        this.router.get('/ramal', dataController_1.dataController.ramal);
        this.router.post('/', dataController_1.dataController.create);
        this.router.put('/:id', dataController_1.dataController.update);
        this.router.delete('/:id', dataController_1.dataController.delete);
    }
}
const dataRoutes = new DataRoutes();
exports.default = dataRoutes.router;
