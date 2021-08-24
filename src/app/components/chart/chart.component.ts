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
  Point,
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
  public chartId: number = Math.trunc(Math.random() * 1000000);

  private chart!: ChartXY;

  public ngAfterViewInit(): void {
    this.chart = lightningChart().ChartXY({container: `${this.chartId}`});
    this.chart.setTitle('IVLIVE CHARTS');
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.chartData.previousValue !== changes.chartData.currentValue) {
      this.setPoints();
    }
  }

  public ngOnDestroy(): void {
    this.chart.dispose();
  }

  private setPoints(): void {
    const originDate = this.chartData[0].time;
    const points = this.chartData.map((item, index) => {
      return {x: index, y: +item.iv}
    });
    this.chart.getDefaultAxisX().setTickStrategy(
      AxisTickStrategies.DateTime,
      (tickStrategy) => tickStrategy.setDateOrigin(new Date(originDate))
    );

    this.chart
      .addLineSeries()
      .setStrokeStyle(new SolidLine({thickness: 1, fillStyle: new SolidFill({color: ColorHEX('#F00')})}))
      .add(points);

  }
}
