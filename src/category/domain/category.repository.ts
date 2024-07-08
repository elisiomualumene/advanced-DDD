//storage -  armazenamento de dados

import { IRepository } from "@shared/domain/repository/repository-interface";
import { Category } from "./category.entity";
import { UUID } from "@shared/domain/value-objects/uuid.vo";

export interface ICategoryRepository extends IRepository<Category, UUID> {}

//memoria
// sequelize
