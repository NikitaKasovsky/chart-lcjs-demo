import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  constructor() { }

  @Output()
  public filtersData = new EventEmitter<any>();

  public form: FormGroup = new FormGroup({
    symbol: new FormControl(),
    otm: new FormControl(),
    term: new FormControl(),
    callPut: new FormControl(),

    timeFrom: new FormControl(),
    timeTo: new FormControl(),
  })

  public submitForm(): void {
    this.filtersData.emit(this.form.value);
  }

}
