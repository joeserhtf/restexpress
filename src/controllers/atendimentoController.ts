import { Request, Response } from 'express';

import pool from '../database';

class AtendimentoController {

    public async get(req: Request, res: Response): Promise<void> {
        const games = await pool.query(`SELECT id, nome, unidade, presente, horario, nivel, ramal
                                        FROM colaboradores
                                        WHERE nivel >= 2`);
        res.json(games);
    }

    public async gets(req: Request, res: Response): Promise<void> {
        const games = await pool.query(`SELECT *
                                        FROM setor`);
        res.json(games);
    }

    public async geta(req: Request, res: Response): Promise<void> {
        const games = await pool.query(`SELECT id, nome, unidade, presente, horario, nivel, ramal
                                        FROM colaboradores
                                        WHERE nivel = 2`);
        res.json(games);
    }

    public async update(req: Request, res: Response): Promise<void> {
        await pool.query(`UPDATE colaboradores 
                          SET
                          unidade = '${req.body.unidade}',
                          presente = '${req.body.presente}',
                          horario = '${req.body.horario}'
                          WHERE id = '${req.body.id}'`);
        res.json({ message: "Cadastro atualizado" });
    }

}
export const atendimentoController = new AtendimentoController;