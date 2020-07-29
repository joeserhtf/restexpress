import { Request, Response } from 'express';
var express = require('express');
var app = express();
const fetch = require('node-fetch');

class restController {

    public async getCnpj(req: Request, res: Response) {
		var cnpj = req.query.cnpj;
		console.log(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
        try {
            const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);

            res.send(await response.json());
            return response.body;
        } catch (exception) {
            console.log(exception);
        }
    }


}



const RestController = new restController;
export default RestController;