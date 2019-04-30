"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const custfixoController_1 = __importDefault(require("../controllers/custfixoController"));
class CustofixoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', custfixoController_1.default.get);
        this.router.post('/', custfixoController_1.default.create);
        this.router.put('/:id', custfixoController_1.default.update);
    }
}
const custofixoRoutes = new CustofixoRoutes();
exports.default = custofixoRoutes.router;
