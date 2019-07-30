import { Request, Response } from 'express';


import pool from '../database';

class ProjetoController {

    public async list(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM projeto');
        res.json(games);
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const games = await pool.query(`SELECT P.id,P.nome,P.orcamento,P.empresa,projpai,S.setor as area,S1.setor as subarea,C1.nome as kuser,C2.nome as kcontato,C.nome as solicitante, ST.situacao as status, PO.prioridade, DATE_FORMAT(P.previsao, '%d-%m-%Y') as previsao,DATE_FORMAT(P.inicio, '%d-%m-%Y') as inicio,P.objetivo,P.beneficioqt,P.beneficioql
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
    }

    public async getOrc(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const games = await pool.query(`SELECT id,idprojeto,valor,date_format(data, '%d-%m-%Y') as data, comentario 
                                        FROM orcaproj 
                                        WHERE idprojeto = ${id}`);
        res.json(games);
    }

    public async createorc(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO orcaproj set ?', [req.body]);
        res.json({ message: 'Salvo' });
    }

    public async getLog(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const games = await pool.query(`SELECT L.id,titulo,comentario,T.tipo,C.nome as usuarioid, date_format(data, '%d-%m-%Y') as data, P.nome as idprojeto 
                                        FROM logproj as L
                                        INNER JOIN colaboradores as C ON L.usuarioid = C.id
                                        INNER JOIN projeto as P ON L.idprojeto = P.id
                                        INNER JOIN tipolog as T ON L.tipo = T.id
                                        WHERE idprojeto = ${id}`);
        res.json(games);
    }

    public async createlog(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO logproj set ?', [req.body]);
        res.json({ message: 'Salvo' });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO projeto set ?', [req.body]);
        res.json({ message: 'Salvo' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE projeto set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM projeto WHERE id = ?', [id]);
        res.json({ message: "Deletado" });
    }
}

export const projetoController = new ProjetoController;