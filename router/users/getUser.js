const express = require('express');
const user = express.Router();
const db = require('../../lib/mysql');
const jwt = require('jsonwebtoken');




user.get('/mahasiswa/:npm', (req, res) => {
    const npm = req.params.npm;
    const q = `SELECT * FROM mahasiswa WHERE npm = ${npm}`;
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else if (result.length === 0) {
            res.status(200).send('npm tidak terdaftar')
        }
        else {
            res.status(200).send(result)
        }
    })
})

user.get('/dosen', (req, res) => {
 const q = `SELECT * FROM dosen`;
 db.query(q, (err, result) => {
     if (err) {
         res.status(500).send(err)
     }
     else {
         res.status(200).send(result)
     }
 })   
})

module.exports = user