import { Request, Response } from 'express';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var oracledb = require('oracledb');

// Use body parser to parse JSON body
app.use(bodyParser.json());

var connAttrs = {
    "user": "JOESER",
    "password": "joeser",
    "connectString": "172.40.1.3:1521/CARAJAS.GRUPOCARAJAS.CRJ.INT",
}

class oclController {

    public async gets(req: Request, res: Response) {
    var filial = '';
    if(req.query.filial != null){
        filial = req.query.filial;
    }
        
        oracledb.getConnection(connAttrs, function (err: any, connection: any) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                console.log(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }

            let query = `SELECT 
                                    CODOCORRENCIA_RET,
                                    COUNT(*) AS Total,
                                    COUNT(CASE WHEN CARREGADO = 'S' THEN 1 END) AS Carregados,
                                    COUNT(CASE WHEN DATA_ENTREGA is not null THEN 1 END) AS Entregues,
                                    COUNT(CASE WHEN DATA_RETORNO is not null THEN 1 END) AS Retornos,
                                    COUNT(CASE WHEN CODOCORRENCIA != 0 THEN 1 END) AS Problemas
                                FROM QLIKVIEW.ENTREGAS_LANCTOS
                                WHERE to_date(to_char(data_saida, 'dd/mm/yy')) >=  to_date('01/07/2020', 'dd/mm/yy')
                                AND to_date(to_char(data_saida, 'dd/mm/yy')) <= to_date('30/07/2020', 'dd/mm/yy')`;

                                if(filial != ''){
                                   query += `AND FILIAL = '${filial}'`;
                                }

                                query += `group by 
                                CODOCORRENCIA_RET`;

            connection.execute(query, {}, {
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

    public async getfilial(req: Request, res: Response) {
    var filial = '';
    if(req.query.filial != null){
        filial = req.query.filial;
    }
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

            let query = `
            SELECT 
                    FILIAL,
                    COUNT(*) AS Total,
                    COUNT(CASE WHEN CARREGADO = 'S' THEN 1 END) AS Carregados,
                    COUNT(CASE WHEN DATA_ENTREGA is not null THEN 1 END) AS Entregues,
                    COUNT(CASE WHEN DATA_RETORNO is not null THEN 1 END) AS Retornos,
                    COUNT(CASE WHEN CODOCORRENCIA != 0 THEN 1 END) AS Problemas
                FROM QLIKVIEW.ENTREGAS_LANCTOS
                WHERE to_date(to_char(data_saida, 'dd/mm/yy')) >=  to_date('01/07/2020', 'dd/mm/yy')
                                AND to_date(to_char(data_saida, 'dd/mm/yy')) <= to_date('30/07/2020', 'dd/mm/yy')`;

                                if(filial != ''){
                                   query += `AND FILIAL = '${filial}'`;
                                }

                               query += `group by FILIAL`;

            connection.execute(query
                , {}, {
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
                            console.log("GET /usersadsa : Connection released");
                        }
                    });
            });
        });
    }

    public async getplaca(req: Request, res: Response) {
    var filial = '';
    if(req.query.filial != null){
        filial = req.query.filial;
    }
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

            let query = `
            SELECT 
                PLACA,
                    COUNT(*) AS Total,
                    COUNT(CASE WHEN CARREGADO = 'S' THEN 1 END) AS Carregados,
                    COUNT(CASE WHEN DATA_ENTREGA is not null THEN 1 END) AS Entregues,
                    COUNT(CASE WHEN DATA_RETORNO is not null THEN 1 END) AS Retornos,
                    COUNT(CASE WHEN CODOCORRENCIA != 0 THEN 1 END) AS Problemas
                FROM QLIKVIEW.ENTREGAS_LANCTOS
                WHERE to_date(to_char(data_saida, 'dd/mm/yy')) >=  to_date('01/07/2020', 'dd/mm/yy')
                                AND to_date(to_char(data_saida, 'dd/mm/yy')) <= to_date('30/07/2020', 'dd/mm/yy')`;

            if(filial != ''){
                                   query += `AND FILIAL = '${filial}'`;
                                }

                                query += `group by 
                PLACA
                                `;

            connection.execute(query
                , {}, {
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
                            console.log("GET /usersadsa : Connection released");
                        }
                    });
            });
        });
    }
    
    public async getdatas(req: Request, res: Response) {
    var filial = '';
    if(req.query.filial != null){
        filial = req.query.filial;
    }
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

            let query = `
            SELECT   
                   trunc(data_saida)  data_saida,
                    COUNT(*) AS Total,
                    COUNT(CASE WHEN CARREGADO = 'S' THEN 1 END) AS Carregados,
                    COUNT(CASE WHEN DATA_ENTREGA is not null THEN 1 END) AS Entregues,
                    COUNT(CASE WHEN DATA_RETORNO is not null THEN 1 END) AS Retornos,
                    COUNT(CASE WHEN CODOCORRENCIA_RET != 0 THEN 1 END) AS Problemas 
                FROM QLIKVIEW.ENTREGAS_LANCTOS
                WHERE trunc(data_saida) >= '15/06/2020'
                AND to_date(to_char(data_saida, 'dd/mm/yy')) >=  to_date('01/07/2020', 'dd/mm/yy')
                                AND to_date(to_char(data_saida, 'dd/mm/yy')) <= to_date('30/07/2020', 'dd/mm/yy')`;


            if(filial != ''){
                                   query += `AND FILIAL = '${filial}'`;
                                }

                                query += `
                group by 
                trunc(data_saida) 
                order by 1,2
                                `;

            connection.execute(query, {}, {
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
                            console.log("GET /datas : Connection released");
                        }
                    });
            });
        });
    }



    public async getrcd(req: Request, res: Response) {

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
    
    public async getAcomp(req: Request, res: Response): Promise<void> {
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
        

            let query = `SELECT 
            ENT.FILIAL,
            GWN.GWN_PLACAD PLACA, 
            COUNT(*) TOTAL, 
            COUNT(CASE WHEN CARREGADO = 'S' THEN 1 END) CARREGADAS,
            COUNT(DATA_ENTREGA) ENTREGUES, 
            COUNT(DATA_RETORNO) RETORNADAS, 
            COUNT(CASE WHEN CODOCORRENCIA_RET != 0 THEN 1 END) OCORRENCIAS
            
        FROM GWN010 GWN
            
            LEFT JOIN QLIKVIEW.ENTREGAS_LANCTOS ENT
            ON ENT.FILIAL = GWN.GWN_FILIAL
            AND ENT.ROMANEIO = GWN.GWN_NRROM
                
        WHERE 1 = 1
        
        AND GWN.GWN_DTSAI > '20200615'`;

            if (req.body.placa != '') {
                query += ` AND GWN.GWN_PLACAD = '${req.body.placa}'`
            }

            if (req.body.filial != '') {
                query += ` AND GWN.GWN_FILIAL = '${req.body.filial}'`
            }

            query += `AND TRUNC(ENT.DATA_SAIDA) BETWEEN '${req.body.dataInicial}' AND '${req.body.dataFinal}'
                        AND GWN.D_E_L_E_T_ = ' '
                        GROUP BY ENT.FILIAL,GWN.GWN_PLACAD
                        `;
                    
                    console.log(query);
                    
            connection.execute(query, {}, {
                outFormat: oracledb.OBJECT // Return the result as Object
            }, function (err: any, result: any) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the acomp",
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
                            console.log("GET /acompanhamento : Connection released");
                        }
                    });
            });
        });
    }

    public async getRelatorio(req: Request, res: Response): Promise<void> {

        var filial = '';
        var placa = '';
        var romaneio = '';
        var carga = '';
        var cDataSaida = '';
        var cInicioP8 = '';
        var cCarregado = '';
        var cEntregue = '';
        var cRetornoP8 = '';

        if(req.query.filial != null){
            filial = req.query.filial;
        }
        if(req.query.placa != null){
            placa = req.query.placa;
        }
        if(req.query.carga != null){
            carga = req.query.carga;
        }
        if(req.query.romaneio != null){
            romaneio = req.query.romaneio;
        }
        if(req.query.cDataSaida != null){
            cDataSaida = req.query.cDataSaida;
        }
        if(req.query.cInicioP8 != null){
            cInicioP8 = req.query.cInicioP8;
        }
        if(req.query.cCarregado != null){
            cCarregado = req.query.cCarregado;
        }
        if(req.query.cEntregue != null){
            cEntregue = req.query.cEntregue;
        }
        if(req.query.cRetornoP8 != null){
            cRetornoP8 = req.query.cRetornoP8;
        }


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
        

            let query = `SELECT
                            --gw1.r_e_c_n_o_,
                            --COUNT(DISTINCT gwn_nrrom) OVER(),
                            gwn.gwn_filial "filial",
                            gwn.gwn_placad "placa",
                            gwn.gwn_nrrom "romaneio",
                            f2.f2_carga "carga",
                            f2.f2_doc || '/' || f2.f2_serie "nota_fiscal",
                            f2_emissao "emissao",
                            NVL(to_char(ent.data_inclusao, 'DD/MM/YYYY HH24:MI:SS'),' ') "data_inclusao",
                            NVL(ent.carregado,' ') "carregado",
                            NVL(to_char(ent.data_saida, 'DD/MM/YYYY HH24:MI:SS'),' ') "data_saida",
                            NVL(to_char(ent.data_entrega, 'DD/MM/YYYY HH24:MI:SS'),' ') "data_entrega",
                            NVL(to_char(ent.data_retorno, 'DD/MM/YYYY HH24:MI:SS'), ' ') "data_retorno"

                        FROM gwn010 gwn
                                                                    
                            INNER JOIN gw1010 gw1 ON gw1.d_e_l_e_t_ = ' '
                                                  AND gw1.gw1_nrrom = gwn_nrrom
                                                  AND gw1.gw1_filial = gwn_filial
                                                    
                            INNER JOIN sf2010 f2 ON f2.d_e_l_e_t_ = ' '
                                                 AND f2_doc = gw1.gw1_nrdc
                                                 AND f2_serie = gw1.gw1_serdc
                                                 AND f2_filial = gw1.gw1_filial
                                                 
                            LEFT JOIN qlikview.entregas_lanctos ent ON ent.romaneio = gwn.gwn_nrrom
                                                                    AND ent.filial = gwn.gwn_filial
                                                                    AND trim(ent.notafiscal) = trim(f2.f2_doc)
                                                                    and trim(ent.serienotafiscal) = trim(f2.f2_serie)
                                                    
                        WHERE 1 = 1

                            AND f2.f2_emissao > '20200615'
                            AND f2_cliente <> '000388'
                            AND gwn.d_e_l_e_t_ = ' '
                            AND gwn.d_e_l_e_t_ = ' '\n`;

            //Se Filial Preenchida, filtrar por filial
            if (filial != ''){
                query += `AND GWN.GWN_FILIAL = '${filial}'\n`;
            }

            if (placa != ''){
                query += `AND GWN.GWN_PLACAD = '${placa}'\n`;
            }

            if (romaneio != ''){
                query += `AND GWN.GWN_NRROM = '${romaneio}'\n`;
            }

            if(carga != ''){
                query += `AND F2.f2_carga = '${carga}'\n`;
            }

            if (cDataSaida == 'TRUE'){
                query += `AND GWN_DTSAI <> ' '\n`;
            }else{
                query += `AND GWN.GWN_DTSAI = ' '\n`;
            }       

            if (cInicioP8 == 'TRUE'){
                query += `AND ent.data_inclusao IS NOT NULL\n`;
            }else{
                query += `AND ent.data_inclusao IS NULL\n`;
            }   

            if (cCarregado == 'TRUE'){
                query += ` AND ENT.CARREGADO = 'S'\n`;
            }else{
                query += `AND (ENT.CARREGADO <> 'S' OR ENT.CARREGADO IS NULL)\n`;
            }

            if (cEntregue == 'TRUE'){
                query += `AND ent.data_entrega IS NOT NULL\n`;
            }else{
                query += `AND ent.data_entrega IS NULL\n`;
            }

            if (cRetornoP8 == 'TRUE'){
                query += `AND ent.data_retorno IS NOT NULL\n`;
            }else{
                query += `AND ent.data_retorno IS NULL\n`;
            }

            query += `ORDER BY 1, 3 desc\n`;

            //query += `fetch first 500 rows only\n`;

            console.log(query);
                    
            connection.execute(query, {}, {
                outFormat: oracledb.OBJECT // Return the result as Object
            }, function (err: any, result: any) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the relatorio",
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
                            console.log("GET /relatorio : Connection released");
                        }
                    });
            });
        });
    }

    public async getOcorrencias(req: Request, res: Response): Promise<void> {

        var filial = '';
        var placa = '';

        if(req.query.filial != null){
            filial = req.query.filial;
        }
        if(req.query.placa != null){
            placa = req.query.placa;
        }
        
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
        

            let query = `SELECT 
                            GWN_FILIAL "filial",
                            GWN_NRROM "romaneio",
                            GWN.GWN_PLACAD "placa",
                            TRIM(GW1_NRDC) || '/' ||  TRIM(GW1_SERDC) "nota",
                            QLIKVIEW.ENTREGAS_LANCTOS.DATA_SAIDA "data_saida",
                            QLIKVIEW.ENTREGAS_LANCTOS.CODOCORRENCIA_RET "ocorrencia",
                            GW1_XORIGE "codigogw1",
                            GW1.GW1_XDTRET "retorno",
                            GW1.GW1_XHRRET "horaretorno" 

                        FROM GWN010 GWN

                            INNER JOIN GW1010 GW1
                            ON GW1.GW1_NRROM = GWN.GWN_NRROM
                            AND GW1.D_E_L_E_T_ = ' '
                            AND (GW1.GW1_XORIGE = 'R1' OR GW1.GW1_XORIGE = 'R2')
                            AND GW1.GW1_XDTRET = ' '
                            
                            INNER JOIN QLIKVIEW.ENTREGAS_LANCTOS
                            ON TRIM(QLIKVIEW.ENTREGAS_LANCTOS.NOTAFISCAL) = TRIM(GW1_NRDC)
                            AND TRIM(QLIKVIEW.ENTREGAS_LANCTOS.SERIENOTAFISCAL) = TRIM(GW1_SERDC)
                            AND TRIM(QLIKVIEW.ENTREGAS_LANCTOS.FILIAL) = TRIM(GWN_FILIAL)
                            AND QLIKVIEW.ENTREGAS_LANCTOS.CODOCORRENCIA_RET IS NOT NULL

                        WHERE 1 = 1 `;

                        if (filial != ''){
                            query += `AND GWN.GWN_FILIAL = '${filial}'\n`;
                        }

                        if (placa != ''){
                            query += `AND GWN.GWN_PLACAD = '${placa}'\n`;
                        }


                       query += `AND GWN.D_E_L_E_T_ = ' '
                                 AND GWN.GWN_DTSAI > '20200615'
                                 \n`;

            console.log(query);
                    
            connection.execute(query, {}, {
                outFormat: oracledb.OBJECT // Return the result as Object
            }, function (err: any, result: any) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the ocorrencias",
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
                            console.log("GET /ocorrencias : Connection released");
                        }
                    });
            });
        });
    }


    public async getClientes(req: Request, res: Response) {
        var filial = '';
        if(req.query.filial != null){
            filial = req.query.filial;
        }
        var codvend = '';
        if(req.query.codvend != null){
            codvend = req.query.codvend;
        }
        var chavebusca = '';
        if(req.query.chavebusca != null){
            chavebusca = req.query.chavebusca;
        }

        if(codvend == ''){
            res.set('Content-Type', 'application/json');
            res.status(400).send(JSON.stringify({
            status: 400,
            message: "Sem Codigo Vendedor",
            detailed_message: "Sem Codigo Vendedor"
            }));
            return;      
        }

        oracledb.getConnection(connAttrs, function (err: any, connection: any) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }

            let query = `
                SELECT  
                    DISTINCT
                    L1_CLIENTE "codClient", 
                    L1_FILIAL "filial", 
                    --L1_LOJA "loja",
                    trim(a1.a1_nome) "nome",
                    trim(a1.a1_cgc) "cpf",
                    NVL(trim(a1.a1_email), ' ') "email",
                    '(' || trim(a1.a1_ddd) || ') '  || trim(a1.a1_tel) "contato"
                    
                FROM SL1010 L1

                    INNER JOIN SA1010 A1
                    ON A1_COD = L1_CLIENTE
                    AND a1.a1_loja = L1.L1_LOJA
                    AND a1.d_e_l_e_t_ = ' '
                    
                    INNER JOIN SA3010 A3
                    ON A3_FILIAL = L1_FILIAL
                    AND a3.A3_COD = L1.L1_VEND
                    AND a3.d_e_l_e_t_ = ' '


                WHERE 1 = 1
                AND L1.d_e_l_e_t_ = ' '
                AND l1.l1_cliente <> '000001'
            `;

            if(codvend != ''){
                query += `AND a3.a3_codusr = '${codvend}'`;
            }


            if(filial != ''){
                query += `AND L1_FILIAL = '${filial}'`;
            }

            if(chavebusca != ''){
                query += `AND (trim(a1.a1_nome) LIKE '%${chavebusca}%' OR trim(a1.a1_cgc) LIKE '%${chavebusca}%')`;
            }

            console.log(query);            

            connection.execute(query, {}, {
                outFormat: oracledb.OBJECT
            }, function (err: any, result: any) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the clientes",
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
                            console.log("GET /clientes : Connection released");
                        }
                    });
            });
        });
    }

    public async getDetalhesCliente(req: Request, res: Response) {
        var filial = '';
        if(req.query.filial != null){
            filial = req.query.filial;
        }
        var codcliente = '';
        if(req.query.codcliente != null){
            codcliente = req.query.codcliente;
        }
        var origem = '';
        if(req.query.origem != null){
            origem = req.query.origem;
        }
            
            oracledb.getConnection(connAttrs, function (err: any, connection: any) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error connecting to DB",
                        detailed_message: err.message
                    }));
                    return;
                }

                let query = `
                    SELECT
                        filial       "filial",
                        codorc       "codorc",
                        codcliente   "codcliente",
                        lojacli      "lojacli",
                        nome         "nome",
                        codvend      "codvend",
                        trim(a3_nome) "vendnome",
                        valor        "valor",
                        MAX(emissao) "emissao",
                        status       "status",
                        origem       "origem"
                    FROM
                        (
                            SELECT
                                l1.l1_filial    filial,
                                l1.l1_num       codorc,
                                l1.l1_cliente   codcliente,
                                l1.l1_loja      lojacli,
                                TRIM(a1.a1_nome) nome,
                                l1.l1_vend      codvend,
                                l1.l1_vlrtot    valor,
                                l1.l1_emissao   emissao,
                                CASE
                                    WHEN ( ( l1.l1_situa = 'FR'
                                             OR l1.l1_situa = 'OK' )
                                           AND l1_storc = ' ' ) THEN
                                        'Finalizado'
                                    WHEN l1_storc = 'C' THEN
                                        'Cancelado'
                                    WHEN ( card.returncode = '00'
                                           AND card.cartaodtcancel IS NULL
                                           AND card.cartaodtcaptura IS NOT NULL ) THEN
                                        'Link Pago'
                                    ELSE
                                        'Aberto'
                                END status,
                                l1.l1_xorigem   origem
                            FROM
                                sl1010                  l1
                                INNER JOIN sa1010                  a1 ON a1_cod = l1_cliente
                                                        AND l1_loja = a1_loja
                                LEFT JOIN qlikview.web_card_log   card ON l1.l1_num = card.l1_num
                                                                        AND l1.l1_filial = card.l1_filial
                            WHERE
                                1 = 1
                            AND l1.l1_cliente <> '000001'
                            `;

                            if(codcliente != ''){
                                query += `AND l1.l1_cliente = '${codcliente}'\n`;
                            }

                            if(origem != ''){
                                query += `AND l1.l1_xorigem = '${origem}'\n`;
                            }

                            if(filial != ''){
                                query += `AND l1.l1_filial = '${filial}'`;
                            }

                              query +=  `
                                AND l1_orcres = ' '
                                AND l1.d_e_l_e_t_ = ' '
                                    )

                                    INNER JOIN SA3010
                                    ON codvend = A3_COD
                                    AND filial = A3_FILIAL

                                GROUP BY
                                    filial,
                                    codorc,
                                    codcliente,
                                    lojacli,
                                    nome,
                                    codvend,
                                    a3_nome,
                                    valor,
                                    status,
                                    origem
                                ORDER BY
                                    9 DESC
                            \n`;

                console.log(query);

                connection.execute(query, {}, {
                    outFormat: oracledb.OBJECT // Return the result as Object
                }, function (err: any, result: any) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(JSON.stringify({
                            status: 500,
                            message: "Error getting the clientes",
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
                                console.log("GET /detalhecli : Connection released");
                            }
                        });
                });
            });
    }
    

    public async getAnaliseCliente(req: Request, res: Response) {
        var filial = '';
        if(req.query.filial != null){
            filial = req.query.filial;
        }
        var codcli = '';
        if(req.query.codcli != null){
            codcli = req.query.codcli;
        }
        

        if(codcli == ''){
            res.set('Content-Type', 'application/json');
            res.status(400).send(JSON.stringify({
            status: 400,
            message: "Sem Codigo Cliente",
            detailed_message: "Sem Codigo Cliente"
            }));
            return;      
        }

        oracledb.getConnection(connAttrs, function (err: any, connection: any) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }

            let query = `
                SELECT
                    TRIM(b1.b1_desc)  "descricao",
                    TRIM(PRODUTO) "produto",
                    SUM(QUANT) "quant",
                    MAX(EMISSAO) "emissao" 
                FROM
                (
                    SELECT 
                        L2.L2_PRODUTO PRODUTO,
                        l2.l2_quant QUANT,
                        L1.L1_EMISSAO EMISSAO
                    
                    FROM SL1010 L1
                    
                        INNER JOIN SL2010 L2
                        ON L1.L1_NUM = L2.L2_NUM
                        AND L1.L1_FILIAL = L2.L2_FILIAL
                        AND L2.D_E_L_E_T_ = ' '
                        
                    WHERE 1 = 1
            `;

            if(filial != ''){
                query += `AND L1.L1_FILIAL = '${filial}'`;
            }

            if(codcli != ''){
                query += `AND L1.L1_CLIENTE = '${codcli}'`;
            }
            
            query += `
                        AND L1.L1_ORCRES = ' '
                        AND L1.D_E_L_E_T_ = ' '

                        ) ITENS

                         INNER JOIN SB1010 B1
                         ON TRIM(B1.B1_COD) = TRIM(PRODUTO)
                         AND B1.D_E_L_E_T_ = ' '

                        GROUP BY B1.B1_DESC, PRODUTO
                        ORDER BY 2 DESC
                        `;

            console.log(query);

            connection.execute(query, {}, {
                outFormat: oracledb.OBJECT
            }, function (err: any, result: any) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the clientes",
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
                            console.log("GET /analiseCliente : Connection released");
                        }
                    });
            });
        });
    }

}

const OclController = new oclController;
export default OclController;