import { Response, Request } from 'express'

class Responser {

  good(datas: any, res: Response) {

    const data = {
      'status': 200,
      'datas': datas,
    }

    res.status(200)
    res.json(data)
    res.end()

  }

  bad(datas: any, res: Response, errorCode: number = 400) {
    const data = {
      'status': errorCode,
      'datas': datas,
    }

    res.status(errorCode)
    res.json(data)
    res.end()
  }

}

export default new Responser()