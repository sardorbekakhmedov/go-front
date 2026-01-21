import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/lesson4/user.service';
import { ActivatedRoute, Router, RouterLinkWithHref } from "@angular/router";
import { User1 } from '../../../services/lesson4/models/user-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [RouterLinkWithHref, FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {


  inputName: string = '';
  inputAge: number | undefined;
  inpuRole: string = 'user'

  name: string = '';
  age: number | undefined;
  role: string = 'user';

  userService: UserService = inject(UserService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  allUsers: User1[] = [];
  filteredUsers: User1[] = [];

  addUser(): void {

    const users = this.userService.getAll();

    const lastId = users.length > 0 ? Math.max(...users.map(x => x.id)) : 0;

    let newUser = new User1(lastId+1, this.inputName, this.inputAge ?? 0, this.inpuRole);
    this.userService.add(newUser);

    this.inputName = '';
    this.inputAge = undefined;

    this.filteredUsers = this.userService.getAll();

     console.log(this.filteredUsers);
  }

  updateUser(userId: number): void {
    let newUser = new User1(0, this.inputName, this.inputAge ?? 0, this.inpuRole)

    this.userService.update(userId, newUser)
  }

  deleteUser(userId: number): void {
    this.userService.remove(userId)
  }

  ngOnInit(): void {
    this.allUsers = this.userService.getAll();

    this.route.queryParamMap.subscribe(params => {
      this.name = params.get('name') || '';
      this.age = params.get('age') ? Number(params.get('age')) : undefined;
      this.role = params.get('role') || '';
    })

    this.applyFilter();
  }

  applyFilter() {
    this.filteredUsers = this.allUsers.filter(u => {

      const names = !this.name || u.name?.toLocaleLowerCase().includes(this.name.toLowerCase());

      const ages = this.age === undefined || u.age == this.age;

      const roles = !this.role || u.role === this.role;

      return names && ages && roles;
    })

    console.log(this.filteredUsers);

    this.router.navigate([], {
      queryParams: {
        name:  this.name || undefined,
        age: this.age || undefined,
        role: this.role || undefined
      },
      queryParamsHandling: 'merge'
    })
  }

}
