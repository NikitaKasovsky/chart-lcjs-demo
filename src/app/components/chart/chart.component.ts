import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {
  AxisTickStrategies,
  ChartXY,
  ColorHEX,
  lightningChart,
  LineSeries,
  SolidFill,
  SolidLine
} from '@arction/lcjs';
import { IChartResponse } from '../../interfaces/http.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnChanges, OnDestroy {

  constructor() {
  }

  @Input()
  public chartData!: IChartResponse[];

  @Input()
  public symbol!: string;

  public chartId: number = Math.trunc(Math.random() * 1000000);

  private chart!: ChartXY;
  private lineSeries!: LineSeries;

  public ngAfterViewInit(): void {
    this.chart = lightningChart().ChartXY({container: `${this.chartId}`});
    this.chart.setTitle('IVLIVE CHARTS');
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.chartData?.previousValue !== changes.chartData?.currentValue) {
      this.lineSeries?.dispose();
      this.setPoints();
    }
  }

  public ngOnDestroy(): void {
    this.chart.dispose();
  }

  private setPoints(): void {
    const originDate = new Date(this.chartData[0].time);

    const points = this.chartData.map((item) => {
      return {x: new Date(item.time).getTime() - originDate.getTime(), y: +item.iv}
    });
    this.chart.getDefaultAxisX().setTickStrategy(
      AxisTickStrategies.DateTime,
      (tickStrategy) => tickStrategy.setDateOrigin(originDate)
    );

    this.lineSeries = this.chart
        .addLineSeries();

    this.lineSeries
      .setStrokeStyle(new SolidLine({thickness: 2, fillStyle: new SolidFill({color: ColorHEX('#ffb700')})}))
      .add(points)
      .setCursorResultTableFormatter((builder, series, xValue, yValue) => {
        return builder
          .addRow(`Symbol: ${this.symbol}`)
          .addRow(`Time: ${series.axisX.formatValue(xValue)}`)
          .addRow(`IV: ${series.axisY.formatValue(yValue)}`)
      });
  }
}
