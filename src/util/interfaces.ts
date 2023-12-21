export interface UserInterface {
    userID: string;
    username: string;
    email: string;
    passwordHash: string;
    verified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface VerificationCodeInterface {
    email: string;
    code: string;
    createdAt?: Date;
}

export interface TransporterInterface {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string,
        pass: string
    };
}
