import express from 'express'

const app = express()

app.get('/', (req, res, next) => {
    res.send('Hola')
})

export default app

