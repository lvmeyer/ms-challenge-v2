import { ErrorResponse } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class BillingsService {
  constructor(private readonly configService: ConfigService) {}

  async sendBillToUser(email: string, price: number): Promise<void> {
    if (!email || !price) {
      throw new ErrorResponse('Missing parameters', 400);
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get<string>('NODEMAILER_USER'),
        pass: this.configService.get<string>('NODEMAILER_PASS'),
      },
    });

    transporter
      .sendMail({
        from: `"Eugene Haris 👻" <${this.configService.get<string>(
          'NODEMAILER_USER',
        )}>`,
        to: email,
        subject: 'Hello ✔',
        text: 'Your bill is ready !',
        html:
          '<h1>Thank you for your purchase !</h1><p>Your bill of ' +
          price +
          ' € is available on our website !</p>',
      })
      .then((info) => {
        console.info('Message sent: %s', info.messageId);
        console.info(nodemailer.getTestMessageUrl(info));

        return {
          info: info.messageId,
        };
      })
      .catch((err) => {
        throw new ErrorResponse(err, 500);
      });
  }

  async sendWelcomeMail(
    email: string,
    firstname: string,
    lastname: string,
  ): Promise<void> {
    if (!email || !firstname || !lastname) {
      throw new ErrorResponse('Missing parameters', 400);
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get<string>('NODEMAILER_USER'),
        pass: this.configService.get<string>('NODEMAILER_PASS'),
      },
    });

    transporter
      .sendMail({
        from: `"Eugene Haris 👻" <${this.configService.get<string>(
          'NODEMAILER_USER',
        )}>`,
        to: email,
        subject: 'Hello ✔',
        text: 'Your bill is ready !',
        html: `<h1>Thank you for your registration !</h1><p>Welcome ${firstname} ${lastname} !</p>`,
      })
      .then((info) => {
        console.info('Message sent: %s', info.messageId);
        console.info(nodemailer.getTestMessageUrl(info));

        return {
          info: info.messageId,
        };
      })
      .catch((err) => {
        throw new ErrorResponse(err, 500);
      });
  }
}
