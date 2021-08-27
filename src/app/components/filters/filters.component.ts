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
import {
  optionType,
  otm,
  term
} from '../../interfaces/http.interface';

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
    }, 0);

    this.rtModeControl.valueChanges.subscribe((value: boolean) => this.rtMode.emit(value));
    this.form.statusChanges.subscribe(status => {
      if (status === 'INVALID') this.rtModeControl.disable();
      if (status === 'VALID') this.rtModeControl.enable();
    })
  }

  @Output()
  public filtersData = new EventEmitter<any>();

  @Output()
  public rtMode = new EventEmitter<any>();

  public otm: otm[] = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  public term: term[] = [7, 14, 21, 30, 60, 90, 120, 150, 180, 270, 360, 720, 1080];
  public optionType: optionType[] = ['C', 'P'];

  public form: FormGroup = new FormGroup({
    symbol: new FormControl('SPX', Validators.required),
    otm: new FormControl(0, Validators.required),
    term: new FormControl(30, Validators.required),
    optionType: new FormControl('C', Validators.required),

    fromTime: new FormControl(null, Validators.required),
    toTime: new FormControl(null, Validators.required),
  })

  public rtModeControl = new FormControl({value: false, disabled: true});

  public submitForm(): void {
    this.filtersData.emit(this.form.value);
    this.form.markAsPristine();
    this.rtModeControl.markAsPristine();
  }
}
