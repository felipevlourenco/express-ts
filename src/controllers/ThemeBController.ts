import ErrorHandler from '../models/ErrorHandler'

class ThemeBController {
  defaultMethod() {
    throw new ErrorHandler(501, 'Not implemented method')
  }
}

export = new ThemeBController()
