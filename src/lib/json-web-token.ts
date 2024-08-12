import { sign } from 'jsonwebtoken';
import * as jwt from 'config/jwt';

export class GenereteJwt {
    async execute(userId: number) {
        const token = await sign({}, jwt.secret, {
            subject: String(userId),
            expiresIn: jwt.expireIn,
            algorithm: 'HS256',
        })

        return token;
    }
}