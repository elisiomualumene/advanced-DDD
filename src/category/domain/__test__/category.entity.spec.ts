import { UUID } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

// Triple AAA
// Arrange - Act - Assert
// const arrange = {name: "Movie"}

describe("Category Unit Tests", () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });
  describe("constructor", () => {
    it("should create category with default values", () => {
      const category = new Category({ name: "Movie" });

      expect(category.category_id).toBeInstanceOf(UUID);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    it("should create category with all values", () => {
      const created_at = new Date();

      const category = new Category({
        name: "Movie",
        description: "Movie description",
        is_active: false,
        created_at,
      });

      expect(category.category_id).toBeInstanceOf(UUID);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBe(created_at);
    });

    it("should create category with with static method", () => {
      const category = new Category({
        name: "Movie",
        description: "Movie description",
      });

      expect(category.category_id).toBeInstanceOf(UUID);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe("category_id field", () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new UUID() },
    ];

    it.each(arrange)("id = %j", ({ category_id }) => {
      const category = new Category({
        name: "Movie",
        category_id,
      });
      expect(category.category_id).toBeInstanceOf(UUID);
      if (category_id instanceof UUID) {
        expect(category.category_id).toBe(category_id);
      }
    });
  });

  describe("Create Commad", () => {
    it("should create a category", () => {
      const category = Category.create({ name: "Movie" });

      expect(category.category_id).toBeInstanceOf(UUID);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it("should create a category with all values", () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie description",
        is_active: false,
      });

      expect(category.category_id).toBeInstanceOf(UUID);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it("should create category with with static method", () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie description",
      });

      expect(category.category_id).toBeInstanceOf(UUID);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  it("should change de name", () => {
    const category = Category.create({
      name: "Movie",
    });
    category.changeName("Other Movie");

    expect(category.name).toBe("Other Movie");
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  it("should change de description", () => {
    const category = Category.create({
      name: "Movie",
      description: "Movie description",
    });

    category.changeDescription("Other Movie description");

    expect(category.description).toBe("Other Movie description");
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  it("should be able to activate a category", () => {
    const category = Category.create({
      name: "Movie",
      is_active: false,
    });

    category.activate();

    expect(category.is_active).toBeTruthy();
  });

  it("should be able to deactivate a category", () => {
    const category = Category.create({
      name: "Movie",
    });

    category.deactivate();

    expect(category.is_active).toBeFalsy();
  });
});

describe("Category Validators", () => {
  describe("Create Command", () => {
    it("should an invalid category with name property", () => {
      expect(() => Category.create({ name: null })).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => Category.create({ name: "" })).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() =>
        Category.create({ name: "t".repeat(256) })
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });
    it("should a invalid category using description property", () => {
      expect(() =>
        Category.create({ description: 5 } as any)
      ).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("should a invalid category using is_active property", () => {
      expect(() =>
        Category.create({ is_active: 5 } as any)
      ).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
    });
  });

  describe("changeName method", () => {
    it("should a invalid category using name property", () => {
      const category = Category.create({ name: "Movie" });
      expect(() => category.changeName(null)).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => category.changeName("")).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => category.changeName(5 as any)).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => category.changeName("t".repeat(256))).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });
  });

  describe("changeDescription method", () => {
    it("should a invalid category using description property", () => {
      const category = Category.create({ name: "Movie" });
      expect(() => category.changeDescription(5 as any)).containsErrorMessages({
        description: ["description must be a string"],
      });
    });
  });
});
