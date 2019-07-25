import { Request, Response } from 'express';


import pool from '../database';

class ProjetoController {

    public async list(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM projeto');
        res.json(games);
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const games = await pool.query(`SELECT id,nome,orcamento,empresa,projpai,setor,subarea,kuser,kcontato,solicitante, status, prioridade,DATE_FORMAT(previsao, '%d-%m-%Y') as previsao,DATE_FORMAT(inicio, '%d-%m-%Y') as inicio,objetivo,beneficioqt,beneficioql
        from projeto
        WHERE id = ${id};`);
        res.json(games);
    }

    public async getOrc(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const games = await pool.query(`SELECT * FROM orcaproj WHERE idprojeto = ${id}`);
        res.json(games);
    }

    public async getLog(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const games = await pool.query(`SELECT * FROM logproj WHERE idprojeto = ${id}`);
        res.json(games);
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO projeto set ?', [req.body]);
        res.json({ message: 'Savlo' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
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