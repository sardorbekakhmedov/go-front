import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { interval, tap } from 'rxjs';

@Component({
  selector: 'app-new-pipe',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './new-pipe.html',
  styleUrl: './new-pipe.css',
})
export class NewPipe {
  readonly timer$ = interval(1000).pipe(
    tap(val => console.log( val, 'NewPipe'))
  );

  ngOnInit( ) {
    console.log(this.timer$, 'NewPipe')
  }

   ngOnDestroy() {
    console.log('NewPipe Komponent ochirildi va interval toxtatildi');
  }

}
