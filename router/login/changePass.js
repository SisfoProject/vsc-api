const express = require('express')
const pass = express.Router()
const db = require('../../lib/mysql')


pass.post('/change-password', (req, res) => {
    const { npm, password } = req.body
    const q = `SELECT * FROM mahasiswa WHERE npm = ${npm}`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else if (result.length === 0) {
            res.status(200).send('npm tidak terdaftar')
        }
        else {
            const q = `UPDATE mahasiswa SET password = '${password}' WHERE npm = '${npm}'`
            db.query(q, (err, result) => {
                if (err) {
                    res.status(500).send(err)
                }
                else {
                    res.status(200).send(result)
                }
            })
        }
    })   
})

module.exports = pass