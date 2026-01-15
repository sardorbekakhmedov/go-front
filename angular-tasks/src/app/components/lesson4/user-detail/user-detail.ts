import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { UserService } from '../../../services/lesson4/user-service';
import { User1 } from '../../../services/lesson4/models/user-model';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLinkWithHref],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail {
  user?: User1;

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  
  ngOnInit(): void {
    this.loadUser();
  }

  loadUser () {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.user = this.userService.getById(id);
    });
  }

  loadUser1() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.user = this.userService.getById(id);
  }

}
