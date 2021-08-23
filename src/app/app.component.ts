import { Component } from '@angular/core';
import { RequestService } from './services/request.service';
import { finalize } from 'rxjs/operators';
import { IChartParams } from './interfaces/http.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private readonly requestService: RequestService
  ) {
  }

  public chartData: any;
  public isLoading!: boolean;

  public filtersValue(event: IChartParams): void {
    event.toTime = event.toTime.replace('T', ' ') + ':00';
    event.fromTime = event.fromTime.replace('T', ' ') + ':00';
    console.log(event)
    this.loadChartData(event)
  }

  private loadChartData(params: IChartParams): void {
    this.isLoading = true;
    this.requestService.getChart(params)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(data => this.chartData = data)
  }

}
