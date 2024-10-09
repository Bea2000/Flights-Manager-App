import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587, // Cambia esto por el puerto de tu SMTP
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: 'nesterinesmailer@gmail.com', // tu usuario SMTP
        pass: 'knzn cjpq yged geof', // tu contraseña SMTP
      },
      debug: true, // show debug output
      logger: true, // log information in console
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
      from: 'Nesterines Flights <nesterinesmailer@gmail.com>', // Dirección del remitente
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return info;
    } catch (error) {
      console.error('Error sending email: ' + error.message);
      throw error;
    }
  }
}
