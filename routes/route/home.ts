
import { Express } from 'express'
import Routing from '../helper'
import { Controller } from '../../registry'

class Home extends Routing {
    welcome(app: Express, path: string) {
        app.route(path).get(Controller.Home.welcome)
        app.route(path).post(Controller.Home.welcome)
        app.route(path).put(Controller.Home.welcome)
        app.route(path).delete(Controller.Home.welcome)
        app.route(path).patch(Controller.Home.welcome)

        this.routing(app, path).get(Controller.Home.welcome)
        this.routing(app, path).post(Controller.Home.welcome)
        this.routing(app, path).put(Controller.Home.welcome)
        this.routing(app, path).delete(Controller.Home.welcome)
        this.routing(app, path).patch(Controller.Home.welcome)
    }
}

export default new Home()