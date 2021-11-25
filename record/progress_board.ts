import { Intefaces } from '../registry'
import Enums from '../enum'

class ProgressBoardRecord {

    public table = {
        schema: 'app',
        name: 'progress_board',
    }

    protected columns: Intefaces.TableInteface[] = [
        {
            name: 'id',
            type: 'SERIAL',
            nullable: false,
            primary: true
        },
        {
            name: 'created_at',
            type: 'TIMESTAMPTZ',
            nullable: true,
            default: 'NOW()'
        },
        {
            name: 'updated_at',
            type: 'TIMESTAMPTZ',
            nullable: true,
        },
        {
            name: 'desc',
            type: 'VARCHAR (255)',
            nullable: true
        },
        {
            name: 'status',
            type: '"BoardStatus"' as any,
            nullable: false
        },
        {
            name: 'deleted_at',
            type: 'TIMESTAMPTZ',
            nullable: true,
        },
    ]

}



export default new ProgressBoardRecord()