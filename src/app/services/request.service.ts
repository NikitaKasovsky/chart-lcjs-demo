import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getHttpParams } from '../helpers/utils.helper';
import {
  IChartParams,
  IChartResponse
} from '../interfaces/http.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private readonly http: HttpClient
  ) { }

  // 'http://localhost:8080/charts/get?symbol=SPX&otm=0&term=30&optionType=C&fromTime=2021-08-20 09:30:00&toTime=2021-08-20 12:30:00'
  public getChart(params: IChartParams): Observable<IChartResponse> {
    return this.http.get<IChartResponse>('/charts/get', {params: getHttpParams(params)})
  }
}
