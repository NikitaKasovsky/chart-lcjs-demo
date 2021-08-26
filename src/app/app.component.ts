import {
  Component,
  OnDestroy
} from '@angular/core';
import { RequestService } from './services/request.service';
import { finalize } from 'rxjs/operators';
import { IChartParams } from './interfaces/http.interface';
import {
  interval,
  Subscription
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  constructor(
    private readonly requestService: RequestService
  ) {
  }

  public chartData: any;
  public isLoading!: boolean;
  public currentSymbol!: string;

  private subscriptions!: Subscription;
  private lastParams!: IChartParams;

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public filtersValue(event: IChartParams): void {
    if (event.toTime.includes('T')) {
      event.toTime = event.toTime.replace('T', ' ') + ':00';
    }

    if (event.fromTime.includes('T')) {
      event.fromTime = event.fromTime.replace('T', ' ') + ':00';
    }

    this.currentSymbol = event.symbol;
    this.lastParams = event;
    this.loadChartData(event)
  }

  public toggleRtMode(event: boolean): void {
    console.log(event)
    // if (event) {
    //   this.subscriptions.add(interval(10 * 1000)
    //     .subscribe(() => {
    //       this.requestService.getChart({
    //         ...this.lastParams,
    //         // fromTime
    //       })
    //     })
    //   );
    // } else {
    //   this.subscriptions.unsubscribe()
    // }
  }

  private loadChartData(params: IChartParams): void {
    this.isLoading = true;
    this.requestService.getChart(params)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(data => this.chartData = data)
  }

}
