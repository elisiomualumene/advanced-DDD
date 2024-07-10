import { FieldsErrors } from "./nest-modules/shared/domain/validators/validator-fields-interface";

declare global {
  namespace jest {
    interface Matchers<R> {
      notificationContainsErrorMessages: (expected: FieldsErrors) => R;
    }
  }
}