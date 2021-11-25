import { Response, Request } from 'express'
import { Responser, Logger, Repositories, Enums, Intefaces } from '../registry'

class ProgressBoard {

    async get(req: Request, res: Response) {
        const status = (req.params.status ? req.params.status : '').toUpperCase()
        return Repositories.ProgressBoardRepository.get(status as Enums.BoardStatus).then(data => Responser.good(data, res)).catch(error => Responser.bad(error, res, 400))
    }

    async insert(req: Request, res: Response) {
        const desc = req.body.desc
        if (desc || desc === '') {
            const status = (req.params.status ? req.params.status : '').toUpperCase() as Enums.BoardStatus
            return await Repositories.ProgressBoardRepository.insert(desc, status).then(data => Responser.good(data, res)).catch(error => Responser.bad(error, res, 400))
        } else {
            Responser.bad('Desc field not exists', res, 400)
        }

    }

    async update(req: Request, res: Response) {
        const statuss = (req.params.status ? req.params.status : '').toUpperCase() as Enums.BoardStatus
        const { id, created_at, desc, status } = req.body

        const progress_board: Partial<Intefaces.ProgressBoardInterface> = { created_at, desc, status }

        return await Repositories.ProgressBoardRepository.update(id, progress_board, statuss).then(data => Responser.good(data, res)).catch(error => Responser.bad(error, res, 400))

    }

    async delete(req: Request, res: Response) {
        const status = (req.params.status ? req.params.status : '').toUpperCase() as Enums.BoardStatus
        const board_id = parseInt(req.body.board_id, 10)
        if (board_id || board_id === 0) {
            if (!isNaN(board_id * 1)) {
                return await Repositories.ProgressBoardRepository.delete(board_id, status).then(data => Responser.good(data, res)).catch(error => Responser.bad(error, res, 400))
            } else {
                Responser.bad('Board_id must be a Number', res, 400)
            }
        } else {
            Responser.bad('Board_id field not exists', res, 400)
        }
    }

}

export default new ProgressBoard()
