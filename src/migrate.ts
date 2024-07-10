import { NestFactory } from '@nestjs/core';
import { MigrationsModule } from './nest-modules/database-modules/migrations.module';
import { getConnectionToken } from '@nestjs/sequelize';
import { migrator } from './core/shared/infra/db/sequelize/migrator';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MigrationsModule, {
    logger: ['error']
  });


  const sequelize = app.get(getConnectionToken())

  migrator(sequelize).runAsCLI()
}
bootstrap();
