import { InvalidUuidError, UUID } from "../uuid.vo";
import { validate as uuidValidate } from "uuid";
describe("UUID Unit Tests", () => {
  const validateSpy = jest.spyOn(UUID.prototype as any, "validate");
  it("should throw an error when UUID is invalid", () => {
    expect(() => {
      new UUID("Invalid-uuid");
    }).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should create a valid UUID", () => {
    const uuid = new UUID();

    expect(uuid).toBeDefined();
    expect(uuidValidate(uuid.id)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should accept a valid UUID", () => {
    const uuid = new UUID("10c3e052-b116-4b9e-87e7-bd01bb5d9b53");
    expect(uuid.id).toBe("10c3e052-b116-4b9e-87e7-bd01bb5d9b53");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
