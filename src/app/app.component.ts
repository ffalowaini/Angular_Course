import { HttpClient } from '@angular/common/http';
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

declare const require;
const xml2js = require("xml2js");

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

  constructor(private authService: AuthService, private http: HttpClient) { }
  ngOnInit() {
    this.authService.autoLogin();
  }
// 
  do1() {
    this.http
      .get("/assets/example.xml", { responseType: "text" }).subscribe(async resp => {
        // console.log(this.parseXml(resp));
        console.log(await this.parseXmlToJson(resp));
      })
    console.log('hi');
  }
  async parseXmlToJson(xml) {
    // With parser
    /* const parser = new xml2js.Parser({ explicitArray: false });
    parser
      .parseStringPromise(xml)
      .then(function(result) {
        console.log(result);
        console.log("Done");
      })
      .catch(function(err) {
        // Failed
      }); */

    // Without parser
    return await xml2js
      .parseStringPromise(xml, { explicitArray: false })
      .then(response => response.Employees.Employee);
  }
//   parseXml(xmlStr) {
//     var result;
//     var parser = require('xml2js');
//     parser.Parser().parseString(xmlStr, (e, r) => {result = r});
//     return result;
// }
  // loadedFeature = 'recipe';

  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }

  // onSearch() {
  //   this.state = this.state === 'open' ? 'close' : 'open';
  // }
}
