import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import ErrorHandler from './models/ErrorHandler'
import MasterRouter from './routes/MasterRouter'

// Load env vars from .env file
dotenv.config({
  path: '.env'
})
const PORT = process.env.PORT || 5000

class Server {
  private _app = express()
  private _router = MasterRouter

  get app() {
    return this._app
  }

  get router() {
    return this._router
  }
}

const server = new Server()

server.app.use('/api', server.router)
server.app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal server error'
  })
})

server.app.listen(PORT, () => {
  console.log(`> Listening on port ${PORT}`)
})
