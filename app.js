const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()

app.use(cors())
app.use(express.json())

app.post('/recipes', async (req, res) => {
    try {
        const { name, ingredients, directions } = req.body
        const newRec = await pool.query(`insert into recipes (name, ingredients, directions) values ('${name}', '${ingredients}', '${directions}') returning *`)
        res.json(newRec.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.get('/recipes', async (req, res) => {
    try {
        const allRecipes = await pool.query('select * from recipes')
        res.json(allRecipes.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.delete('/recipes/:id', async (req, res) => {
    const id = req.params.id
    console.log('id:', id)
    await pool.query(`delete from recipes where id=${id}`)
    res.json({ response: 'success' })
})



app.listen(5000, () => console.log('server has started on port 5000'))