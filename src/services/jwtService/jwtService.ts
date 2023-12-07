import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET;

class JWTService {

    SECRET!: string;

    createToken(userID: string) {
        const token = jwt.sign(userID , this.SECRET);
        return token;
    }

    verifyToken(token: string) {
        const decoded = jwt.verify(token, this.SECRET);
        if (!decoded) {
            return false;
        }
        return decoded;
    }

    constructor() {
        if (SECRET) {
            this.SECRET = SECRET;
        }
    }
}

export const jwtService = new JWTService();
