import express from 'express'
import {createServer} from 'http'
import cors from 'cors'
import {setupWebSocket} from './socket'
import 'dotenv/config'

const app = express()
const server = createServer(app)

app.use(cors())
app.use(express.json())

app.get('/', (_, res: any) => res.send('Chat backend running'))

setupWebSocket(server)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
