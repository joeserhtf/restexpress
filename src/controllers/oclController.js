"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
};
class oclController {
    getSL1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            oracledb.getConnection(connAttrs, function (err, connection) {
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
                }, function (err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(JSON.stringify({
                            status: 500,
                            message: "Error getting the SL1010",
                            detailed_message: err.message
                        }));
                    }
                    else {
                        res.contentType('application/json').status(200);
                        res.send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /user_profiles : Connection released");
                        }
                    });
                });
            });
        });
    }
}
const OclController = new oclController;
exports.default = OclController;
