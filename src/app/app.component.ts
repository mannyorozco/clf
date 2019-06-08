import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public firearmsList;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/assets/api/firearm-list.json').subscribe(list => {
      console.log(list);
      this.firearmsList = list;
    });
  }
}
