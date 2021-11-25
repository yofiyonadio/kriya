import { Logger, Records, Intefaces, Enums } from '../registry'


class Migrate {
    createDB() {
        return `CREATE DATABASE "${process.env.DB_NAME}" WITH ENCODING 'UTF8' ;`
    }
    createSCHEMA() {
        return `CREATE SCHEMA IF NOT EXISTS "${process.env.DB_SCHEMA}"`
    }
    createTABLES() {
        return Object.values(Records).map(record => `CREATE TABLE IF NOT EXISTS "${record['table']['schema']}"."${record['table']['name']}" ()`).join(';')
    }
    createENUMS() {
        return Object.keys(Enums).map((enum_name, i) => {
            return `CREATE TYPE "${enum_name}" AS ENUM(${Object.values(Object.values(Enums)[i]).map(enums => `'${enums}'`).join(',')})`
        }).join(';')
    }
    createCOLUMNS() {
        return Object.values(Records).map((record: any) => record['columns'].map((column: Intefaces.TableInteface) => `ALTER TABLE "${record['table']['schema']}"."${record['table']['name']}" ADD COLUMN IF NOT EXISTS "${column.name}" ${column.type} ${column.default ? 'DEFAULT ' + column.default : ''} ${column.primary ? 'PRIMARY KEY' : ''} ${column.unique ? 'UNIQUE' : ''} ${column.nullable ? 'NULL' : 'NOT NULL'}`).join(';')).join(';')
    }
}



export default new Migrate()