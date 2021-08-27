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
  public rtData: any;
  public isLoading!: boolean;
  public currentSymbol!: string;

  private subscription!: Subscription;
  private rtMode!: boolean;

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public filtersValue(event: IChartParams): void {
    if (event.toTime.includes('T')) {
      event.toTime = AppComponent.formTimeField(event.toTime);
    }

    if (event.fromTime.includes('T')) {
      event.fromTime = AppComponent.formTimeField(event.fromTime);
    }

    this.currentSymbol = event.symbol;

    if (this.rtMode) {
      this.loadChartData(event);
      this.subscription = interval(10 * 1000)
        .subscribe(() => {
          this.requestService.getChart({
            ...event,
            fromTime: !this.rtData
              ? AppComponent.formTimeField(this.chartData[this.chartData.length - 1].time).slice(0, -8)
              : AppComponent.formTimeField(this.rtData[this.rtData.length - 1].time).slice(0, -8)
          })
            .subscribe(data => this.rtData = data)
        });
      return;
    }

    this.loadChartData(event);
  }

  public toggleRtMode(event: boolean): void {
    this.rtMode = event;

    if (!event && this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadChartData(params: IChartParams): void {
    this.isLoading = true;
    this.requestService.getChart(params)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(data => this.chartData = data)
  }

  private static formTimeField(date: string): string {
    return date.replace('T', ' ') + ':00';
  }
}
