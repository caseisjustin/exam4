import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { ResponseModule } from './response/response.module';
import { ResultModule } from './result/result.module';
import { User } from './user/user.model';
import { Survey } from './survey/survey.model';
import { Question } from './question/question.model';
import { Response } from './response/response.model';
import { Result } from './result/result.model';
import { MailerModule } from '@nestjs-modules/mailer';
// import { Auth2Module } from './auth2/auth2.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "surveymanagment",
      autoLoadModels: true,
      synchronize: true,
      models: [User, Survey, Question, Response, Result],
    }),
    MailerModule.forRoot({
      transport: {
        host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "fbe140f53c5e77",
        pass: "9611bfb33669b9"
      }
      },
      defaults: {
        from: '"No Reply" <no-reply@example.com>',
      },
    }),
    AuthModule,
    UserModule,
    SurveyModule,
    QuestionModule,
    ResponseModule,
    ResultModule,
  ],
  
})
export class AppModule {}
