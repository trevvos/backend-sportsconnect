import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/users', async(req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários.'})
    }
})

app.post('/users', async (req, res) => {
    const { name, email } = req.body

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email
            }
        })

        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json( { error: 'Erro ao criar usuário.' })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${ PORT }`)
})