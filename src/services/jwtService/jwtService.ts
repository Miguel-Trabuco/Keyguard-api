import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

class JWTService {

    SECRET!: string;

    createToken(userID: string) {
        return jwt.sign(userID, this.SECRET);
    }

    verifyToken(token: string) {
        if (!token) {
            return '';
        }
        try {
            const userID = jwt.verify(token, this.SECRET);
            return userID as string

        } catch (error) {
            return '';
        }
    }

    constructor() {
        if (SECRET) {
            this.SECRET = SECRET;
        }
    }
}

export const jwtService = new JWTService();
