import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET;

class JWTService {

    SECRET!: string;

    createToken(userID: string) {
        const token = jwt.sign(userID , this.SECRET);
        return token;
    }

    verifyToken(token: string) {
        const userID = jwt.verify(token, this.SECRET);
        if (!userID) {
            return false;
        }
        return userID;
    }

    constructor() {
        if (SECRET) {
            this.SECRET = SECRET;
        }
    }
}

export const jwtService = new JWTService();
