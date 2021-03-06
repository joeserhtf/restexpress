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
class ScController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query(`SELECT S.id, S.dataap, S.chamado ,S.numerosc, T.tipo, C.nome, U.unidade, A.situacao
                                        FROM sc AS S
                                        INNER JOIN tiposc as T ON S.tipo = T.id
                                        INNER JOIN colaboradores AS C ON S.solicitante = C.id
                                        INNER JOIN unidade AS U ON S.unidade = U.id
                                        INNER JOIN statussc AS A ON S.situacao = A.id;`);
            res.json(games);
        });
    }
    listh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('SELECT * FROM historicocf;');
            res.json(games);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO impressoras set ?', [req.body]);
            res.json({ message: 'Salvo' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldGame = req.body;
            yield database_1.default.query('UPDATE impressoras set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "Updated" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM impressoras WHERE id = ?', [id]);
            res.json({ message: "Deletado" });
        });
    }
}
exports.scController = new ScController;
