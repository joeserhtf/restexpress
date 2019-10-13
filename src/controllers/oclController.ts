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

    public async getSL1(req: Request, res: Response) {
        
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
}

const OclController = new oclController;
export default OclController;