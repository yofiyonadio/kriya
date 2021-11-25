import { Enums } from '../registry'

interface TableInteface {
    name: string
    type: 'VARCHAR (10)' | 'VARCHAR (50)' | 'VARCHAR (255)' | 'SERIAL' | 'TIMESTAMP' | 'TIMESTAMPTZ' | 'INTEGER' | 'BOOLEAN' | 'TEXT' | 'JSON' | 'JSONB'
    nullable: boolean
    primary?: boolean
    unique?: boolean
    default?: string | number

}

export default TableInteface