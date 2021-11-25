import { Response, Request, NextFunction } from 'express'

import { Responser, Jwt, Logger } from '../registry'

class Middleware {

    async default(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1] as string

        req.originalUrl = trimSlash(req.originalUrl)

        const whiteList = [
            '',
            '/token'
        ]

        const protect = !whiteList.includes(req.originalUrl.split(process.env.APP_API_URL as any)[1])

        if (protect) {
            const sign = await Jwt.decode(token).then(() => true).catch(() => false)
            if (sign) { next() } else { Responser.bad('Unauthorized', res, 401) }
        } else { next() }

    }

}

function trimSlash(originalUrl: string): any {
    if (originalUrl[originalUrl.length - 1] === '/') {
        originalUrl = originalUrl.slice(0, -1);
        return trimSlash(originalUrl)
    } else {
        return originalUrl
    }
}

export default new Middleware()
