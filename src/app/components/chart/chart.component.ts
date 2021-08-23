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
    this.chart.getDefaultAxisX().setTickStrategy(AxisTickStrategies.Time);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.chartData.currentValue) {
      this.setPoints()
    }
  }

  public ngOnDestroy(): void {
    this.chart.dispose();
  }

  private setPoints(): void {
    const series = this.chart.addLineSeries();
    series.add(this.chartData.map((item: IChartResponse) => {
      const res = {x: new Date(item.time).getTime() / 1000, y: +item.iv};
      return res
    }))


    // const originDate = this.chartData[0].time;
    // this.chart.getDefaultAxisX().setTickStrategy(
    //   AxisTickStrategies.DateTime,
    //   (tickStrategy) => tickStrategy.setDateOrigin(originDate)
    // );



    // const lineSeries = this.chart.addLineSeries();
    // const points = this.chartData.map((item: IChartResponse) => {
    //   return {x: item.time, y: item.iv}
    // })
    // lineSeries.setStrokeStyle(new SolidLine({ thickness: 1, fillStyle: new SolidFill({ color: ColorHEX('#F00') }) }));
    // lineSeries.add(points);
  }

}
