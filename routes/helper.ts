import { Express } from 'express'
import { Logger } from '../registry'

class Routing {
    routing(app: Express, path: string) {
        let base_url = process.env.APP_API_URL
        if (!base_url?.split('/')[1]?.length) {
            base_url = ''
        }
        return app.route(base_url + path)
    }
}

export default Routing
