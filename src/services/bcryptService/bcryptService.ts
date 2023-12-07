import bcrypt from 'bcrypt';

class BcryptService {
    hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    comparePassword(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword);
    }
}

export const bcryptService = new BcryptService();
