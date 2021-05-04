import { Router } from 'express'
import ThemeARouter from './themeA/ThemeARouter'
import themeBRouter from './themeB/themeBRouter'

class MasterRouter {
  private _router = Router()
  private _subRouterA = ThemeARouter
  private _subRouterB = themeBRouter

  constructor() {
    this._configure()
  }

  private _configure() {
    this._router.use('/themeA', this._subRouterA)
    this._router.use('/themeB', this._subRouterB)
  }

  get router() {
    return this._router
  }
}

export = new MasterRouter().router
