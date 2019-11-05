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
        this.router.get('/', dataController_1.dataController.listimp);
        this.router.get('/ramal', dataController_1.dataController.getramal);
        this.router.post('/', dataController_1.dataController.createimp);
        this.router.put('/', dataController_1.dataController.updateimp);
        this.router.delete('/:id', dataController_1.dataController.delete);
    }
}
const dataRoutes = new DataRoutes();
exports.default = dataRoutes.router;
