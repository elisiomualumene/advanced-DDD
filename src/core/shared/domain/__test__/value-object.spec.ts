import { ValueObject } from "../value-object";

class stringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class complexValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super();
  }
}

describe("Value Object Unit Tests", () => {
  it("Simple Test VO - should be equals", () => {
    const valueObject1 = new stringValueObject("value1");
    const valueObject2 = new stringValueObject("value1");

    expect(valueObject1.equals(valueObject2)).toBeTruthy();
    expect(valueObject1.equals(null as any)).toBeFalsy();
    expect(valueObject1.equals(undefined as any)).toBeFalsy();
  });

  it("Simple Test VO - should not be iquals", () => {
    const valueObject1 = new stringValueObject("value1");
    const valueObject2 = new stringValueObject("value2");

    expect(valueObject1.equals(valueObject2)).toBeFalsy();
  });

  it("Complex Test VO - should be equals", () => {
    const complexObject1 = new complexValueObject("value1", 1);
    const complexObject2 = new complexValueObject("value1", 1);

    expect(complexObject1.equals(complexObject2)).toBeTruthy();
    expect(complexObject1.equals(null as any)).toBeFalsy();
    expect(complexObject1.equals(undefined as any)).toBeFalsy();
  });

  it("Complex Test VO - should not be iquals", () => {
    const complexObject1 = new complexValueObject("value1", 1);
    const complexObject2 = new complexValueObject("value1", 2);

    expect(complexObject1.equals(complexObject2)).toBeFalsy();
  });
});
