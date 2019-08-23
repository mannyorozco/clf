import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firearm } from 'src/app/shared/models/firearm';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) {}

  public getFirearmList(): Observable<Firearm[]> {
    return this.http.get<Firearm[]>('/assets/api/firearm-list.json');
  }
}
