import { Response, Request } from 'express'
import { Responser, Jwt } from '../registry'

class Token {

    async generate(req: Request, res: Response) {
        const token = await Jwt.encode(process.env.JWT_SECRET).catch(err => err)
        Responser.good({ token: token }, res)
    }

}

export default new Token()
