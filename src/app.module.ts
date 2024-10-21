import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsModule } from './forms/forms.module';
import { APP_GUARD } from '@nestjs/core';
import { ResponsesModule } from './responses/responses.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'mysql',
      port: +process.env.DATABASE_PORT || 3306,
      username: process.env.DATABASE_USER || 'user',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'formsdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    FormsModule,
    ResponsesModule,
  ]
})
export class AppModule {}
