import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  animations: [
    trigger('move', [
      state(
        'beforStart',
        style({
          opacity: 0,
          transform: 'translateX(0px)',
        })
      ),
      state(
        'start',
        style({
          opacity: 1,
          transform: 'translateX(50PX)',
        })
      ),
      state(
        'end',
        style({
          transform: 'translateX(200px)',
          opacity: 0,
        })
      ),
      transition('beforStart => start', animate(300)),
      transition('start <=> end', animate(600)),
      transition('end <=> beforStart', animate(0)),
    ]),
    trigger('move1', [
      state(
        'start',
        style({
          opacity: 0,
          transform: 'translateX(0px)',
        })
      ),
      state(
        'end',
        style({
          opacity: 0,
          transform: 'translateX(200px)',
        })
      ),
      transition('start => end', [
        animate(1000, keyframes([
          style({
            transform: 'translateX(0px)',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translateX(20px)',
            opacity: 0.3,
            offset: 0.1
          }),
          style({
            transform: 'translateX(100px)',
            opacity: 1,
            offset: 0.5
          }),
          style({
            transform: 'translateX(180px)',
            opacity: 0.5,
            offset: 0.9
          }),
          style({
            transform: 'translateX(200px)',
            opacity: 0,
            offset: 1
          })
        ]))
      ]),
    ]),
  ],
})
export class StartComponent implements OnInit {
  state = 'beforStart';
  state1 = 'start';
  constructor(private router: Router) {}
  ngOnInit(): void {
    // this.loopx();
    setTimeout(() => {
      // this.state = 'end';
      this.router.navigate(['recipes']);
    }, 5000);
  }

  onDone() {
    if (this.state == 'start') this.state = 'end';
    else if (this.state == 'end') this.state = 'beforStart';
    else this.state = 'start';
  }
  onDone1() {
    if (this.state1 == 'start') this.state1 = 'end';
    // else if (this.state == 'end') this.state = 'beforStart';
    else this.state1 = 'start';
  }
}
