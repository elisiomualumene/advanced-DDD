import { UUID } from "../../shared/domain/value-objects/uuid.vo";
import { InMemoryRepository } from "../../shared/infra/db/in-memory/in-memory.repository";
import { Category } from "../../category/domain/category.entity";

export class CategoryInMemoryRepository extends InMemoryRepository<Category, UUID> {
    getEntity(): new (...args: Category[]) => Category {
        return Category;
    }

}