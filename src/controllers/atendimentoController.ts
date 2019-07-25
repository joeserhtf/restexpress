import { Request, Response } from 'express';

import pool from '../database';

class AtendimentoController {

    public async get(req: Request, res: Response): Promise<void> {
        const games = await pool.query(`SELECT nome, id, setor, chamadoatual, obs
                                        FROM colaboradores
                                        ORDER BY id`);
        res.json(games);
    }

    public async gets(req: Request, res: Response): Promise<void> {
        const games = await pool.query(`SELECT *
                                        FROM setor`);
        res.json(games);
    }

    public async update(req: Request, res: Response): Promise<void> {
        await pool.query(`UPDATE colaboradores 
                          SET
                            setor = '${req.body.setor}',
                            chamadoatual = '${req.body.chamadoatual}',
                            obs = '${req.body.obs}'
                          WHERE id = '${req.body.id}'`);
        res.json({ message: "Cadastro atualizado" });
    }

}

export const atendimentoController = new AtendimentoController;