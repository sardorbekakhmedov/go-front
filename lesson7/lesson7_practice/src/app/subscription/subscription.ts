import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-subscription',
  imports: [RouterLink],
  templateUrl: './subscription.html',
  styleUrl: './subscription.css',
})
export class SubscriptionComponent {

  private subs: Subscription = new Subscription();
  

  ngOnInit() {
    this.subs.add(
    interval(1000).subscribe(count => console.log(count, 'subs'))
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    console.log('SubscriptionComponentda Komponent ochirildi va interval toxtatildi');
  }

}
