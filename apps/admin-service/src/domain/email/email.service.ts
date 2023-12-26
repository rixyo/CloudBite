import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as mailgen from 'mailgen';
import { ConfigService } from 'src/config/config.service';
import { Logger } from 'src/logger/logger';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.createTransporter();
  }
  private createTransporter() {
    const email = this.configService.get().sendEmail.verifiedEmail;
    const password = this.configService.get().sendEmail.verifiedEmailPassword;
    if (!email || !password) {
      throw new Error('Email or password not found');
    }
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });
  }
  async sendEmail(email: string, text: string) {
    const mailGenerator = new mailgen({
      theme: 'default',
      product: {
        name: 'CloudBite',
        link: 'https://mailgen.js/',
      },
    });
    const response = {
      body: {
        name: email,
        intro:
          "Thanks For Interested in Cloudbite! We're very excited to have you on board.",
        action: {
          instructions:
            'To get started with CloudBite, please copy the code below and paste it into the verification page' +
            '\n' +
            ' here is your code: ' +
            text +
            '\n' +
            'Do not share this code and email with anyone else.',

          button: {
            color: '#22BC66',
            text: 'Create your account now',
            link: 'http://localhost:3001',
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    const sendEmail = mailGenerator.generate(response);
    const message = {
      from: process.env.VERIFIED_SENDER_EMAIL,
      to: email,
      subject: 'Invitation to join CloudBite',
      html: sendEmail,
    };
    await this.transporter
      .sendMail(message)
      .then((res) => {
        this.logger.log('Email sent successfully');
      })
      .catch((err) => {
        this.logger.error(err);
      });
  }
}
