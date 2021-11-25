import { Express } from 'express'

import { Route } from '.'

class Routes {
    route(app: Express) {

        Route.Home.welcome(app, '/')

        Route.Token.generate(app, '/token')

        Route.ProgressBoard.todo(app, '/board/:status?')

        Route.NotFound.default(app, '*')

    }
}

export default new Routes()
