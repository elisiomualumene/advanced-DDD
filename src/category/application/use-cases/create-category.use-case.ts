import { IUseCase } from "../../../shared/application/use-cases.interface";
import { Category } from "../../domain/category.entity";
import { ICategoryRepository } from "../../domain/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "./common/category-output";

export class CreateCategoryUseCase
  implements IUseCase<CreateCategoryInput, CreateCategoryOutput>
{
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const category = Category.create(input);

    await this.categoryRepo.insert(category);

    return CategoryOutputMapper.toOutput(category);
  }
}

export type CreateCategoryInput = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

export type CreateCategoryOutput = CategoryOutput;
