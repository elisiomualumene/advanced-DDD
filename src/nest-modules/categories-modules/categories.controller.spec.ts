import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { DatabaseModule } from '../database-modules/database.module';
import { CategoriesModule } from './categories.module';
import { ConfigModule } from '../config-modules/config.module';
//piramide de testes

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({}), DatabaseModule, CategoriesModule],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    // console.log(module.get(ConfigService).get('DB_HOST'));
  });

  it('should be defined', () => {
    // console.log(controller);
    expect(controller).toBeDefined();
  });
});
