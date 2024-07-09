import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from '@core/category/infra/db/sequelize/category.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: ':memory',
      logging: false,
      models: [CategoryModel],
    }),
    CategoriesModule,
  ],
})
export class AppModule {}
