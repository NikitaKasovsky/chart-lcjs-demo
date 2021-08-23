import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getChart(): Observable<any> {
    return this.http.get('http://localhost:8080/charts/get?symbol=SPX&otm=0&term=30&optionType=C&fromTime=2021-08-20 09:30:00&toTime=2021-08-20 12:30:00')
  }
}
