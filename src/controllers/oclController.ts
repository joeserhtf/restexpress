import { Request, Response } from 'express';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var oracledb = require('oracledb');

// Use body parser to parse JSON body
app.use(bodyParser.json());

var connAttrs = {
    "user": "joeser",
    "password": "j33o5e77s56e4r667",
    "connectString": "172.40.1.2:1521/CARAJAS.ORACLE.ALOOTELECOM.COM.BR",

}

class oclController {

    public async gets(req: Request, res: Response) {
            oracledb.getConnection(connAttrs, function (err: any, connection: any) {
                if (err) {
                    // Error connecting to DB
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error connecting to DB",
                        detailed_message: err.message
                    }));
                    return;
                }
        
                connection.execute(`SELECT l1_filial as filial
                                          ,l1_situa as situa
                                    FROM SL1010 
                                    WHERE (l1_situa = 'RX' OR l1_situa = 'ER') 
                                    AND D_E_L_E_T_ = ' '`, {}, {
                    outFormat: oracledb.OBJECT // Return the result as Object
                }, function (err: any, result: any) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(JSON.stringify({
                            status: 500,
                            message: "Error getting the SL1010",
                            detailed_message: err.message
                        }));
                    } else {
                        res.contentType('application/json').status(200);
                        res.send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(
                        function (err: any) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /user_profiles : Connection released");
                            }
                        });
                });
            });
        }


    public async get(req: Request, res: Response) {
        delete(require.cache[require.resolve('P:/monitor_situa.json')]);
        const situa = require('P:/monitor_situa.json');
        res.json(situa.orcamentos)
    }

    public getcx(req: Request, res: Response) {
        delete(require.cache[require.resolve('W:/logs/geral.json')]);
        const cxs = require('W:/logs/geral.json');
        res.json(cxs)
    }

    public async getrcd(req: Request, res: Response) {
        
        const orccd = req.body;
        console.log(orccd)
        
        oracledb.getConnection(connAttrs, function (err: any, connection: any) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(`{
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }`);
                return;
            }
    
            connection.execute(`SELECT  sl1.L1_FILIAL, sl1.L1_NUM, sl1.L1_CLIENTE, sl1.L1_DOC, sl1.L1_SERIE,
                                        sl1.L1_SITUA, sl1.L1_XSITUA, sl1.l1_vlrtot,
                                        sc5.C5_NOTA, sc5.C5_SERIE, sc5.C5_XDOCRET,
                                        sd1.D1_DOC, sd1.D1_SERIE, sd1.D1_PEDIDO
                                FROM SL1010 sl1,
                                    SC5010 sc5,
                                    SD1010 sd1
                                WHERE sl1.L1_FILIAL = '${orccd.filial}'
                                AND (sl1.L1_NUM = '${orccd.orc}' OR sl1.L1_ORCRES = '${orccd.orc}')
                                AND sc5.C5_XDOCRET like sl1.L1_NUM||'%'
                                AND sd1.D1_DOC = sc5.C5_NOTA
                                AND sd1.D1_SERIE = sc5.C5_SERIE
                                AND sl1.D_E_L_E_T_ = ' '
                                AND sc5.D_E_L_E_T_ = ' '
                                AND sd1.D_E_L_E_T_ = ' '
                                `, {}, {
                outFormat: oracledb.OBJECT // Return the result as Object
            }, function (err: any, result: any) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the SL1010",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200);
                    res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err: any) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /rcd : Connection released");
                        }
                    });
            });
        });
    }

    public async getorc(req: Request, res: Response) {
        
        const orccd = req.body;
        
        oracledb.getConnection(connAttrs, function (err: any, connection: any) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(`{
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }`);
                return;
            }
    
            connection.execute(`SELECT  l1_num, l1_cliente, l1_situa, l1_xsitua, l1_orcres, l1_doc, l1_serie, l1_pedres, l1_origem ,
                                        l1_operado, l1_vlrtot, l1_dinheir, l1_cartao, l1_credito, l1_forma, l1_emisnf,
                                        UTL_RAW.CAST_TO_VARCHAR2(DBMS_LOB.SUBSTR(l1_ergrvbt, 2000, 1)) AS l1_ergrvbt
                                        FROM SL1010
                                WHERE l1_filial = '${orccd.filial}'
                                AND l1_num = '${orccd.orc}'
                                AND d_e_l_e_t_ = ' '
                                 `, {}, {
                outFormat: oracledb.OBJECT // Return the result as Object
            }, function (err: any, result: any) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the SL1010",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200);
                    res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err: any) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /rcd : Connection released");
                        }
                    });
            });
        });
    }

    public async getprod(req: Request, res: Response) {
        
        const produto = req.body;

        oracledb.getConnection(connAttrs, function (err: any, connection: any) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(`{
                    status: 500,
                    message: "Error conectar DB",
                    detailed_message: err.message
                }`);
                return;
            }
    
            connection.execute(`SELECT 
                                    B1_XDSCGRP, B1_DESC, B1_COD, B1_CODBAR FROM SB1010
                                WHERE b1_desc LIKE '%${produto.Dproduto}%'
                                AND b1_cod LIKE '%${produto.Cprotheus}%      '
                                AND b1_codbar LIKE '%${produto.Cbarras}  '
                                AND d_e_l_e_t_ = ' '
                                 `, {}, {
                outFormat: oracledb.OBJECT // Return the result as Object
            }, function (err: any, result: any) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Erro on SB1",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200);
                    res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err: any) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /PROD : Conexão Liberada");
                        }
                    });
            });
        });
    }

}

const OclController = new oclController;
export default OclController;