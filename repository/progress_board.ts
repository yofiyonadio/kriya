import { Database as DB, Intefaces, Enums, Logger } from '../registry'

class ProgressBoardRepository {

    async get(status: Enums.BoardStatus) {
        return DB.query(`SELECT * FROM app.progress_board "board" WHERE board."status"::TEXT ILIKE '%${status}%' AND board.deleted_at IS NULL`).then(results => Promise.resolve(results)).catch(err => Promise.reject(err))
    }

    async insert(desc: string, status: Enums.BoardStatus) {
        return DB.query(`INSERT INTO app.progress_board ("desc", "status") VALUES ('${desc}', '${status}')`).then(results => Promise.resolve(results)).catch(err => Promise.reject(err))
    }

    async update(id: number, datas: Partial<Intefaces.ProgressBoardInterface>, status: Enums.BoardStatus) {
        const update_parser = Object.keys(datas).filter(data => !!(datas as any)[data] || (datas as any)[data] === 0).map(data => `"${data}" = '${(datas as any)[data]}'`).join(', ')
        return DB.query(`UPDATE app.progress_board SET ${update_parser}, updated_at = NOW() WHERE id = ${id} AND "status"::TEXT = '${status}'`).then(results => Promise.resolve(results)).catch(err => Promise.reject(err))
    }

    async delete(id: number, status: Enums.BoardStatus) {
        return DB.query(`UPDATE app.progress_board SET deleted_at = NOW() WHERE id = ${id} AND "status"::TEXT = '${status}' AND deleted_at IS NULL`).then(results => Promise.resolve(results)).catch(err => Promise.reject(err))
    }

}

export default new ProgressBoardRepository()
