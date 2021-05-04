import { Router, Request, Response, NextFunction } from 'express'
import ThemeBController from '../../controllers/ThemeBController'

class ThemeBRouter {
  private _router = Router()
  private _controller = ThemeBController

  constructor() {
    this._configure()
  }

  private _configure() {
    this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = this._controller.defaultMethod()
        res.status(200).json(result)
      } catch (error) {
        next(error)
      }
    })
  }

  get router() {
    return this._router
  }
}

export = new ThemeBRouter().router
