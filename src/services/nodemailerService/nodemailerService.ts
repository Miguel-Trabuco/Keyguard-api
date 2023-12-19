import * as nodemailer from 'nodemailer';
const MAIL_USER = process.env.MAIL_USER || '';
const MAIL_PASSWORD = process.env.MAIL_PASSWORD || '';

const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    secure: true,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
    },
});

export const sendMail = (email: string, html: string, title: string) => {
    const emailOptions = {
        from: "Keyguard",
        to: email,
        subject: title,
        html: html
    };

    try {

    } catch (err) {
        
    }
}

