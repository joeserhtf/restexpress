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
class LoginController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('SELECT * FROM colaboradores');
            res.json(games);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const { email } = req.body;
            const email = 'joeser.fermiano@carajas.net.br';
            const { password } = req.body;
            console.log(password);
            console.log(email);
            const games = yield database_1.default.query(`SELECT * FROM colaboradores
                                        WHERE email = '${email}'
                                        AND password = '${password}';`);
            res.json(games);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO colaboradores set ?', [req.body]);
            res.json({ message: 'Salvo' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldGame = req.body;
            yield database_1.default.query('UPDATE colaboradores set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "Updated" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM colaboradores WHERE id = ?', [id]);
            res.json({ message: "Deletado" });
        });
    }
}
const loginController = new LoginController;
exports.default = loginController;
