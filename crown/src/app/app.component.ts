import { Component, OnInit } from '@angular/core';
import { mind } from './services/notion';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  accelerometerAcceleration$ = mind
    .login({
      email: environment.email,
      password: environment.password,
    })
    .then(() => {
      mind.selectDevice((devices) => {
        return devices.find((device) => device.deviceNickname === "Crown-E0D");
      });
      // mind.accelerometer().subscribe(accelerometer => {

      //   if (accelerometer.acceleration > 1) console.log(accelerometer);
      //   return accelerometer.acceleration;
      // });
      // mind.kinesis("leftHandPinch").subscribe((intent) => {
      //   console.log("hello from Pinch", intent);
      //   if (intent.probability > 0.6) console.log("Pinch", intent.probability);
      //   return intent.probability;
      // });
      mind.kinesis("mentalMath").subscribe((intent) => {
        console.log("hello from brain", intent);
        if (intent.probability > 0.95) console.log("Mental Math", intent.probability);
        return intent.probability;
      });

      // mind.kinesis("tongue").subscribe((intent) => {
      //   console.log("hello from tongue!!", intent);
      //   if (intent.probability > 0.5) console.log("tongue", intent.probability);
      //   return intent.label;
      // });
    })
    .catch((error) => {
      console.log(error);
    });


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
    console.log ("Hello");
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
