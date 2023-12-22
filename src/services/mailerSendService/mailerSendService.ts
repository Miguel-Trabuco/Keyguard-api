import { MailerSend, Sender } from "mailersend";

export const mailerSend = new MailerSend({
    apiKey: process.env.MS_API_TOKEN as string
});

export const setFrom = new Sender ('noreply@keyguard.software', 'Keyguard');
