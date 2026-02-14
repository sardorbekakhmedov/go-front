import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounce, filter, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  searchText: string | null = null;

  private searchSubject$ = new Subject<string>();

  constructor() {
      this.searchSubject$.pipe(
      debounce(600),
      filter(text => text.trim().length >= 3)
    ).subscribe(val => {
      console.log('Searching: ', val)
    });
  }


  onSearch(value: string) {
    this.searchSubject$.next(value);
  }

}
