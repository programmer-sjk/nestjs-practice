import { Admin } from "../../../src/admin/entities/admin.entity";
import { hash } from "../../../src/common/bcrypt";

export class AdminFactory {
  private constructor() {}

  static from(email: string, password: string) {
    return Admin.of(email, hash(password));
  }
}