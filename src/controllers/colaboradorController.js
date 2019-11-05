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
class ColaboradorController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield database_1.default.query(`SELECT C.id, S.setor, C.unidade , K.cargo, nome, email, ramal 
                                      FROM colaboradores as C
                                      INNER JOIN setor as S 
                                      ON C.setor = S.id
                                      INNER JOIN cargos as K
                                      ON C.cargo = K.id 
                                      ORDER BY C.id;`);
            res.json(col);
        });
    }
    getU(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uni = yield database_1.default.query('SELECT id ,unidade FROM unidade ORDER BY id;');
            res.json(uni);
        });
    }
    getC(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const carg = yield database_1.default.query('SELECT id ,cargo FROM cargos ORDER BY id;');
            res.json(carg);
        });
    }
    getS(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const se = yield database_1.default.query('SELECT id ,setor FROM setor ORDER BY id;');
            res.json(se);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO colaboradores set ?', [req.body]);
            res.json({ message: 'Colaborador Cadastrado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE colaboradores set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "Cadastro atualizado" });
        });
    }
}
const colaboradorController = new ColaboradorController;
exports.default = colaboradorController;
