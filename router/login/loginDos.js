const express = require('express');
const logDos = express.Router();
const db = require('../../lib/mysql');

logDos.post('/login-dosen', (req, res) => {
    const { nip, password } = req.body; 
    
    const q = `SELECT * FROM dosen WHERE nip = '${nip}' AND password = '${password}'`;
    db.query(q, (err, result) => {
        if (err) {
            res.status(401).send({ error: 'Nip or Password is incorrect' });
        } else {
            if (result.length === 0) {
                res.status(401).send({ error: 'Nip or Password is incorrect' });
            }
            else {
                res.status(200).send({ result, message: 'Login Success' });
            }
        }
    });
});

module.exports = logDos;
