import { Enums } from '../registry'

interface ProgressBoardInterface {
    id: number
    created_at: Date
    updated_at: Date
    desc: string
    status: Enums.BoardStatus
    deleted_at: Date
}



export default ProgressBoardInterface