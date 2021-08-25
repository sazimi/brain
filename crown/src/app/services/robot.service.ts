import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


export class Robot {
  name: string;
  model: string;
}


@Injectable({
  providedIn: 'root'
})
export class RobotService {

  constructor(private httpClient: HttpClient) { }


  endPoint = '/api';


  getRobots(): Observable<Robot> {
    return this.httpClient.get<Robot>(this.endPoint + '/robot')
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  httpError(error) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }

}
