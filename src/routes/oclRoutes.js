"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const oclController_1 = __importDefault(require("../controllers/oclController"));
class oclRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', oclController_1.default.getSL1);
    }
}
const OclRoutes = new oclRoutes();
exports.default = OclRoutes.router;
