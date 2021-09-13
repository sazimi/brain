import { Component, OnInit } from '@angular/core';
import { mind } from './services/notion';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  constructor() { }

  focusScore$ = mind.focus().pipe(
    map((focus) => {
      return (focus.probability * 100)
    })
  );

  calmScore$ = mind.calm().pipe(
    map((calm) => {
      return (calm.probability * 100)
    })
  );

  ngOnInit() {
    mind
      .login({
        email: environment.email,
        password: environment.password,
      })
      .then(() => { })
      .catch((error) => {
        console.log(error);
      });
  }
}
