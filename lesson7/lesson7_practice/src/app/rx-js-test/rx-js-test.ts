import { Component, DestroyRef, inject } from '@angular/core';
import { interval } from 'rxjs';
import { RouterLink } from "@angular/router";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-rx-js-test',
  imports: [RouterLink],
  templateUrl: './rx-js-test.html',
  styleUrl: './rx-js-test.css',
})
export class RxJsTest {
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    interval(1000)
    .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(count => console.log(count, 'test 1'));
  }

  ngOnDestroy() {
    console.log('RxJsTest Komponent ochirildi va interval toxtatildi');
  }
}
