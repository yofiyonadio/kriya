import jwt from 'jsonwebtoken'

class Jwt {

    encode(key: any) {
        return new Promise((resolve, reject) => {
            jwt.sign(key, process.env.JWT_SECRET as string, {}, (error, token) => {
                if (error) {
                    reject(error)
                }
                resolve(token)
            })
        })
    }

    decode(token: string) {
        return new Promise((resolve, reject) => {
            return jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
                if (error) {
                    reject('Auth failed!')
                } else {
                    resolve(decoded)
                }
            })
        })
    }

}


export default new Jwt()
