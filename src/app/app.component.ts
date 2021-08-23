import {
  Component,
  OnInit
} from '@angular/core';
import { RequestService } from './services/request.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly requestService: RequestService
  ) {
  }

  public chartData: any;
  public isLoading!: boolean;

  public ngOnInit(): void {
    this.loadChartData();
  }

  private loadChartData(): void {
    this.isLoading = true;
    this.requestService.getChart()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(data => this.chartData = data)
  }

}
