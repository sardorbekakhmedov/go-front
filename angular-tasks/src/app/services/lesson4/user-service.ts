import { Injectable } from "@angular/core";
import { User1 } from "./models/user-model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users :User1[] = [
            new User1(1, 'Ali', 14),
            new User1(2, 'Vali', 16),
            new User1(3, 'G\'ani', 18),
            new User1(4, 'Shomurod', 20),
            new User1(5, 'Durdona', 17)
    ];

    getById(id: number): User1 | undefined{
      return this.users.find(u => u.id === id);
    }

    getAll() {
        return this.users;
    }
}