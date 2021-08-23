import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  constructor(
  ) {
    setTimeout(() => {
      this.form.markAllAsTouched();
    }, 0)
  }

  @Output()
  public filtersData = new EventEmitter<any>();

  public form: FormGroup = new FormGroup({
    symbol: new FormControl('SPX', Validators.required),
    otm: new FormControl(0, Validators.required),
    term: new FormControl(30, Validators.required),
    optionType: new FormControl('C', Validators.required),

    fromTime: new FormControl(null, Validators.required),
    toTime: new FormControl(null, Validators.required),
  })

  public submitForm(): void {
    this.filtersData.emit(this.form.value);
  }

}
