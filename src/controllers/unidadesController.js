"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class unidadesController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield database_1.default.query(`SELECT id, unidade, DATE_FORMAT(cxatu, '%Y-%m-%dT%H:%i') as cxatu, lstatus 
                                      FROM unidade;`);
            res.json(col);
        });
    }
    getS(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield database_1.default.query(`SELECT id, lstatus 
                                      FROM unidade;`);
            res.json(col);
        });
    }
    getcx() {
        return __awaiter(this, void 0, void 0, function* () {
            return (console.log("CX"));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE unidade set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "Situação Atualizada" });
        });
    }
    updateS(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE unidade set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "Situação Atualizada" });
        });
    }
    updateAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query(`UPDATE unidade set cxatu = "${req.body.cxatu}"`);
            res.json({ message: "Situação Atualizada" });
        });
    }
}
const UnidadesController = new unidadesController;
exports.default = UnidadesController;
