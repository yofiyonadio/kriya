
import { Express } from 'express'

import Routing from '../helper'

import { Controller } from '../../registry'

class NotFound extends Routing {
    default(app: Express, path: string) {
        app.route(path).get(Controller.NotFound.default)
        app.route(path).post(Controller.NotFound.default)
        app.route(path).put(Controller.NotFound.default)
        app.route(path).delete(Controller.NotFound.default)
        app.route(path).patch(Controller.NotFound.default)

        this.routing(app, path).get(Controller.NotFound.default)
        this.routing(app, path).post(Controller.NotFound.default)
        this.routing(app, path).put(Controller.NotFound.default)
        this.routing(app, path).delete(Controller.NotFound.default)
        this.routing(app, path).patch(Controller.NotFound.default)
    }
}

export default new NotFound()