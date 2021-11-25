
import { Express } from 'express'
import Routing from '../helper'
import { Controller } from '../../registry'

class Token extends Routing {
    generate(app: Express, path: string) {
        this.routing(app, path).get(Controller.Token.generate)
        this.routing(app, path).post(Controller.Token.generate)
    }
}

export default new Token()