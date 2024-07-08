import { Entity } from "../../../../domain/entity";
import { InMemoryRepository } from "../in-memory.repository";
import { UUID } from "../../../../domain/value-objects/uuid.vo";
import { NotFoundError } from "../../../../domain/errors/not-found.error";

type StubEntityConstructorProps = {
  entity_id?: UUID;
  name: string;
  price: number;
};
class StubEntity extends Entity {
  entity_id: UUID;
  name: string;
  price: number;

  constructor(props: StubEntityConstructorProps) {
    super();
    this.entity_id = props.entity_id || new UUID();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price,
    };
  }
}

class stubInMemoryRepository extends InMemoryRepository<StubEntity, UUID> {
  getEntity(): new (...args: StubEntity[]) => StubEntity {
    return StubEntity;
  }
}

describe("InMemoryRepository Unit Test", () => {
  let repo: stubInMemoryRepository;

  beforeEach(() => {
    repo = new stubInMemoryRepository();
  });

  it("should insert a new entity", async () => {
    const entity = new StubEntity({
      entity_id: new UUID(),
      name: "Test",
      price: 100,
    });

    await repo.insert(entity);

    expect(repo.items.length).toBe(1);
    expect(repo.items[0]).toBe(entity);
  });

  it("should bulk insert entities", async () => {
    const entities = [
      new StubEntity({
        entity_id: new UUID(),
        name: "Test",
        price: 100,
      }),
      new StubEntity({
        entity_id: new UUID(),
        name: "Test",
        price: 100,
      }),
    ];

    await repo.bulkInsert(entities);

    expect(entities.length).toBe(2);
    expect(repo.items[0]).toBe(entities[0])
    expect(repo.items[1]).toBe(entities[1])
  });

  it("should returns all entities", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repo.insert(entity);

    const entities = await repo.findAll();

    expect(entities).toStrictEqual([entity]);
  });

  it("should throws error on update when entity not found", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await expect(repo.update(entity)).rejects.toThrow(
      new NotFoundError(entity.entity_id, StubEntity)
    );
  });

  it("should updates an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repo.insert(entity);

    const entityUpdated = new StubEntity({
      entity_id: entity.entity_id,
      name: "updated",
      price: 1,
    });
    await repo.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repo.items[0].toJSON());
  });

  it("should throws error on delete when entity not found", async () => {
    const uuid = new UUID();
    await expect(repo.delete(uuid)).rejects.toThrow(
      new NotFoundError(uuid.id, StubEntity)
    );

    await expect(
      repo.delete(new UUID("9366b7dc-2d71-4799-b91c-c64adb205104"))
    ).rejects.toThrow(
      new NotFoundError("9366b7dc-2d71-4799-b91c-c64adb205104", StubEntity)
    );
  });

  it("should deletes an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repo.insert(entity);

    await repo.delete(entity.entity_id);
    expect(repo.items).toHaveLength(0);
  });
});
