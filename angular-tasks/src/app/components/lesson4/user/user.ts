import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/lesson4/user.service';
import { RouterLinkWithHref } from "@angular/router";
import { User1 } from '../../../services/lesson4/models/user-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [RouterLinkWithHref, FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {

  name: string = '';
  age: number | undefined;
  role: string = 'user';

  userService: UserService = inject(UserService);

  addUser(): void {

    const users = this.userService.getAll();

    const lastId = users.length > 0 ? Math.max(...users.map(x => x.id)) : 0;

    let newUser = new User1(lastId+1, this.name, this.age ?? 0, this.role);
    this.userService.add(newUser);

    this.name = '';
    this.age = undefined;
  }

  updateUser(userId: number): void {
    let newUser = new User1(0, this.name, this.age ?? 0, this.role)

    this.userService.update(userId, newUser)
  }

  deleteUser(userId: number): void {
    this.userService.remove(userId)
  }

}
