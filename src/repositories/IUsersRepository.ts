import { User } from "../entities/User";

export abstract class IUsersRepository {
  abstract findByEmail(email: string): Promise<User>;
  abstract create(user: User): Promise<void>;
}
