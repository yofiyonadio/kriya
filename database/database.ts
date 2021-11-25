import { Pool } from 'pg'
import { Color, Logger } from '../registry'
import Migrate from './migrate'


class Database {

    async pool(with_DB: boolean = true) {
        if (with_DB) {
            return new Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: process.env.DB_PORT as any,
            })
        } else {
            return new Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                password: process.env.DB_PASSWORD,
                port: process.env.DB_PORT as any,
            })
        }
    }

    async init() {
        return new Promise(async (resolve, reject) => {
            if (process.env.APP_DB === 'true') {
                const _client = await (await this.pool(false)).connect()
                await _client.query(Migrate.createDB()).then(res => res).catch(err => err)
                _client.release()

                await this.pool()
                    .then(clients => {
                        clients.connect(async (error, client) => {
                            if (error) { reject(error) }
                            Logger.log('Database Connection success!', Color.blue)

                            await client.query(Migrate.createSCHEMA())
                            await client.query(Migrate.createTABLES())
                            await client.query(Migrate.createENUMS())
                                .then(res => res).catch(err => err)
                            await client.query(Migrate.createCOLUMNS())
                            Logger.log('Database Migration success!', Color.blue)
                            client.release()

                            resolve(true)
                        })
                    })
            } else {
                Logger.log(`Database Not Used, But it's Ok!`, Color.blue)
                resolve(true)
            }
        })
    }

    async query(query: string) {
        return new Promise((resolve, reject) => {
            this.pool()
                .then(clients => {
                    clients.connect(async (error, client) => {
                        if (error) { reject(error) }
                        await client.query(query)
                            .then(res => {
                                if (res.command === 'SELECT') {
                                    if (res.rowCount > 0) {
                                        client.release()
                                        resolve(res.rows)
                                    } else {
                                        client.release()
                                        reject('NOT_FOUND')
                                    }
                                }
                                if (res.command === 'INSERT') {
                                    if (res.rowCount > 0) {
                                        client.release()
                                        resolve(true)
                                    } else {
                                        client.release()
                                        reject(false)
                                    }
                                }
                                if (res.command === 'UPDATE') {
                                    if (res.rowCount > 0) {
                                        client.release()
                                        resolve(true)
                                    } else {
                                        client.release()
                                        reject(false)
                                    }
                                }
                                if (res.command === 'DELETE') {
                                    if (res.rowCount > 0) {
                                        client.release()
                                        resolve(true)
                                    } else {
                                        client.release()
                                        reject(false)
                                    }
                                }
                            }).catch(err => {
                                client.release()
                                reject(err)
                            })
                    })
                })
        })
    }
}



export default new Database()