import * as nodemailer from 'nodemailer';
const MAIL_USER = process.env.MAIL_USER || '';
const MAIL_PASSWORD = process.env.MAIL_PASSWORD || '';

const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    secure: false,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
    },
});

export const sendMail = (email: string, html: string, title: string) => {
    const emailOptions = {
        from: '"Keyguard" noreply@keyguard.software',
        to: email,
        subject: title,
        html: html
    };

    try {
        transporter.sendMail(emailOptions);
        return true

    } catch (err) {
        return false
    }
}
