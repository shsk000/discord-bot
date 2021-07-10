import { AdminUser } from "./AdminUser";
import { User } from "./User";

type UserType = User | AdminUser;

type UserListBase = {
  [key: string]: UserType;
};

export class UserFactory<
  UserList extends UserListBase,
  UserId extends keyof UserList
> {
  public readonly list: Map<string, UserType> = new Map();

  public setUser(userId: UserId, user: UserList[UserId]) {
    this.list.set(userId as string, user);
  }

  public getUser(userId: string): UserType | undefined {
    return this.list.get(userId);
  }

  private isAdmin(user: UserType | undefined): user is AdminUser {
    return user instanceof AdminUser;
  }

  public getAdminUser(): AdminUser[] {
    const tmp: AdminUser[] = [];

    this.list.forEach((user) => {
      if (this.isAdmin(user)) {
        tmp.push(user);
      }
    });

    return tmp;
  }
}
