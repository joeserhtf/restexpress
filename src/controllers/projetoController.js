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
class ProjetoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('SELECT * FROM projeto');
            res.json(games);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query(`SELECT P.id,P.nome,P.orcamento,P.empresa,projpai,S.setor as area,S1.setor as subarea,C1.nome as kuser,C2.nome as kcontato,C.nome as solicitante, ST.situacao as status, PO.prioridade, DATE_FORMAT(P.previsao, '%d-%m-%Y') as previsao,DATE_FORMAT(P.inicio, '%d-%m-%Y') as inicio,P.objetivo,P.beneficioqt,P.beneficioql
                                        FROM projeto as P
                                        INNER JOIN colaboradores as C ON P.solicitante = C.id 
                                        INNER JOIN colaboradores as C1 ON P.kuser = C1.id
                                        INNER JOIN colaboradores as C2 ON P.kcontato = C2.id
                                        INNER JOIN prioridade as PO ON P.prioridade = PO.id
                                        INNER JOIN setor as S ON P.setor = S.id
                                        INNER JOIN setor as S1 ON P.subarea = S1.id
                                        INNER JOIN statussc as ST ON P.status = ST.id
                                        WHERE P.id = ${id}`);
            res.json(games);
        });
    }
    getOrc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query(`SELECT id,idprojeto,valor,date_format(data, '%d-%m-%Y') as data, comentario 
                                        FROM orcaproj 
                                        WHERE idprojeto = ${id}`);
            res.json(games);
        });
    }
    createorc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO orcaproj set ?', [req.body]);
            res.json({ message: 'Salvo' });
        });
    }
    getLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query(`SELECT L.id,titulo,comentario,T.tipo,C.nome as usuarioid, date_format(data, '%d-%m-%Y') as data, P.nome as idprojeto 
                                        FROM logproj as L
                                        INNER JOIN colaboradores as C ON L.usuarioid = C.id
                                        INNER JOIN projeto as P ON L.idprojeto = P.id
                                        INNER JOIN tipolog as T ON L.tipo = T.id
                                        WHERE idprojeto = ${id}`);
            res.json(games);
        });
    }
    createlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO logproj set ?', [req.body]);
            res.json({ message: 'Salvo' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO projeto set ?', [req.body]);
            res.json({ message: 'Salvo' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE projeto set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "Updated" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM projeto WHERE id = ?', [id]);
            res.json({ message: "Deletado" });
        });
    }
}
exports.projetoController = new ProjetoController;
