
import { Express } from 'express'
import Routing from '../helper'
import { Controller } from '../../registry'

class ProgressBoard extends Routing {
    todo(app: Express, path: string) {
        this.routing(app, path).get(Controller.ProgressBoard.get)
        this.routing(app, path).post(Controller.ProgressBoard.insert)
        this.routing(app, path).put(Controller.ProgressBoard.update)
        this.routing(app, path).delete(Controller.ProgressBoard.delete)
    }
}

export default new ProgressBoard()