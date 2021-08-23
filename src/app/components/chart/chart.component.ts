import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {
  ChartXY,
  lightningChart
} from '@arction/lcjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  constructor() { }

  @Input()
  public chartData: any;
  public chartId: number = Math.trunc(Math.random() * 1000000);

  private chart!: ChartXY;

  public ngOnInit(): void {
    console.log(this.chartId)
    this.chart = lightningChart().ChartXY({container: `${this.chartId}`});
    this.chart.setTitle('IVLIVE CHARTS');
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.chartData.currentValue) {
      // ..
    }
  }

}
