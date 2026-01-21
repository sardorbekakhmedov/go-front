import { Injectable } from "@angular/core";
import { User1 } from "./models/user-model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users :User1[] = new Array<User1>;

    getById(id: number): User1 | undefined {
      return this.users.find(u => u.id === id);
    }

    getAll() {
        return this.users;
    }

    add(user: User1): void {
        this.users.push(user);
    }

    update(userId: number, user: User1): void {

        this.remove(userId);
        user.id = userId;
        this.users.push(user);
    }

    remove(userId: number): void {
        this.users = this.users.filter(u => u.id !== userId);
    }
}