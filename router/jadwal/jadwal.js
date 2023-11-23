const express = require('express')
const jadwal = express.Router()
const db = require('../../lib/mysql')


// jadwal.get('/jadwal', (req, res) => {
//     res.send('')
// })

jadwal.get('/jadwal/:hari/:kelas', (req, res) => {
    const { kelas, hari } = req.params
    const q = `SELECT * FROM v_jadwal WHERE kelas = '${kelas}' AND hari = '${hari}' order by jam`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else if (result.length === 0) {
            res.status(200).send('kamu tidak ada jadwal hari ini')
        }
        else {
            res.status(200).send(result)
        }
    })
})

jadwal.get('/all-jadwal', (req, res) => {
    const q = `SELECT * FROM v_jadwal`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else if (result.length === 0) {
            res.status(200).send('tidak ada jadwal')
        }
        else {
            res.status(200).send(result)
        }
    })
})

jadwal.get('/all-jadwal/:kelas', (req, res) => {
    const { kelas } = req.params
    const q = `SELECT * FROM v_jadwal WHERE kelas = '${kelas}' order by hari `
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else if (result.length === 0) {
            res.status(200).send('tidak ada jadwal')
        }
        else {
            res.status(200).send(result)
        }
    })
})

jadwal.put('/update-jadwal/:id', (req, res) => {
    const { id } = req.params
    const {hari, jam} = req.body
    const q = 'UPDATE jadwal SET jam = ?, hari = ? WHERE id = ?'
    db.query(q, [jam, hari, id], (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(result)
        }
    })
})




module.exports = jadwal