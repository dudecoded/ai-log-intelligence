require('dotenv').config()

const cors = require('cors')
const express = require('express')
const fixtures = require('../../shared/dashboard-fixtures.json')

const app = express()
const port = Number(process.env.PORT) || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (request, response) => {
	response.json({ status: 'ok' })
})

app.get('/api/dashboard/overview', (request, response) => {
	response.json(fixtures.dashboard)
})

app.get('/api/incidents', (request, response) => {
	response.json(fixtures.incidents)
})

app.get('/api/logs', (request, response) => {
	response.json(fixtures.logs)
})

app.listen(port, () => {
	console.log(`LogLens API listening on port ${port}`)
})
