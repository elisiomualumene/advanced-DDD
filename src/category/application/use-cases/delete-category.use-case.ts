import { IUseCase } from "../../../shared/application/use-cases.interface";
import { UUID } from "../../../shared/domain/value-objects/uuid.vo";
import { ICategoryRepository } from "../../domain/category.repository";

export class DeleteCategoryUseCase
  implements IUseCase<DeleteCategoryInput, DeleteCategoryOutput>
{
  constructor(private categoryRepo: ICategoryRepository) {}

  async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    const uuid = new UUID(input.id);
    await this.categoryRepo.delete(uuid);
  }
}

export type DeleteCategoryInput = {
  id: string;
};

type DeleteCategoryOutput = void;
