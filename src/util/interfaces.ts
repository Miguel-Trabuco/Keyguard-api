export interface UserInteface {
    userID: string;
    username: string;
    email: string;
    passwordHash: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface ProjectInterface {
    projectID: string;
    title: string;
    description: string;
    userID: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface VerificationCodeInterface {
    email: string;
    code: string;
    createdAt?: Date;
};

export interface TransporterInterface {
    host: string,
    port: number,
    secure: boolean,
    auth: {
        user: string,
        pass: string
    },
};
