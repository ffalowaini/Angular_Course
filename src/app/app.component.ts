import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

declare const require;
const xml2js = require("xml2js");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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
}
