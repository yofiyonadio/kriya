import { Response, Request } from 'express'
import { Responser } from '../registry'

class Home {

    welcome(req: Request, res: Response) {
        Responser.good('Kriya Backend Techincal Test Server is Running, Enjoy :)', res)
    }

}

export default new Home()
