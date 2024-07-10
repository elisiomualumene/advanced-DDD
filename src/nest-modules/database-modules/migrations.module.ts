import { Module } from '@nestjs/common';
import { ConfigModule } from '../config-modules/config.module';
import { DatabaseModule } from './database.module';

@Module({
    imports: [ConfigModule.forRoot(), DatabaseModule]
})
export class MigrationsModule {}
