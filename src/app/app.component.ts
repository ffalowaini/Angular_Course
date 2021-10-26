import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
// import {
//   trigger,
//   state,
//   style,
//   transition,
//   animate,
//   keyframes,
//   group,
// } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // animations: [
  //   trigger('search', [
  //     state(
  //       'close',
  //       style({
  //         height: 40,
  //         width: 40,
  //         'border-radius': 100,
  //         opacity: 1,
  //         // filter: 'blur(10px)',
  //       })
  //     ),
  //     state(
  //       'open',
  //       style({
  //         height: 600,
  //         width: 1200,
  //         'border-radius': 15,
  //         opacity: 0.75,
  //         // filter: 'blur(10px)',
  //       })
  //     ),
  //     transition('close <=> open', animate(600)),
  //   ]),
  //   trigger('search-btn', [
  //     state(
  //       'close',
  //       style({
  //         bottom: 20,
  //         left: 20,
  //       })
  //     ),
  //     state(
  //       'open',
  //       style({
  //         bottom: 580,
  //         left: 1180,
  //       })
  //     ),
  //     transition('close => open', animate(0)),
  //     transition('open => close', animate(100)),

  //   ]),
  // ],
})
export class AppComponent implements OnInit {
  // state = 'open';

  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.autoLogin();
  }
  // loadedFeature = 'recipe';

  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }

  // onSearch() {
  //   this.state = this.state === 'open' ? 'close' : 'open';
  // }
}
