import { Request, Response } from 'express';


import pool from '../database';

class ScController {

    public async list(req: Request, res: Response): Promise<void> {
        const games = await pool.query(`SELECT S.id, S.dataap, S.chamado ,S.numerosc, T.tipo, C.nome, U.unidade, A.situacao
                                        FROM sc AS S
                                        INNER JOIN tiposc as T ON S.tipo = T.id
                                        INNER JOIN colaboradores AS C ON S.solicitante = C.id
                                        INNER JOIN unidade AS U ON S.unidade = U.id
                                        INNER JOIN statussc AS A ON S.situacao = A.id;`);
        res.json(games);
    }

    public async listh(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM historicocf;');
        res.json(games);
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO impressoras set ?', [req.body]);
        res.json({ message: 'Salvo' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE impressoras set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM impressoras WHERE id = ?', [id]);
        res.json({ message: "Deletado" });
    }
}

export const scController = new ScController;