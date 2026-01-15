import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/lesson4/user-service';
import { RouterLinkWithHref } from "@angular/router";

@Component({
  selector: 'app-user',
  imports: [RouterLinkWithHref],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {

  userService: UserService = inject(UserService);

}
