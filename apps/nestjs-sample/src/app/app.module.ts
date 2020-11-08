import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { MetadataArgsStorage } from 'typeorm/metadata-args/MetadataArgsStorage';
import { getMetadataArgsStorage } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "nestjs-sample-db",
      password: "password",
      database: "nestjs-sample-db",
      entities: getMetadataArgsStorage().tables.map(t => t.name),
      synchronize: true,
      autoLoadEntities: true
    }),
    TodoModule,
    UserModule,
    ProjectModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
