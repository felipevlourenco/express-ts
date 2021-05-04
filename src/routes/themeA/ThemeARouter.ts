import { Router, Request, Response, NextFunction } from 'express'
import ThemeAController from '../../controllers/ThemeAController'

class ThemeARouter {
  private _router = Router()
  private _controller = ThemeAController

  constructor() {
    this._configure()
  }

  private _configure() {
    this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._controller.defaultMethod())
    })
  }

  get router() {
    return this._router
  }
}

export = new ThemeARouter().router
