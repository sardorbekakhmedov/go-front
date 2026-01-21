import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { User1 } from '../../../services/lesson4/models/user-model';
import { UserService } from '../../../services/lesson4/user.service';

@Component({
  selector: 'app-login',
  imports: [RouterLinkWithHref, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

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

}
