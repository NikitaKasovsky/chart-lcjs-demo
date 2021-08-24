export type term = 7 | 14 | 21 | 30 | 60 | 90 | 120 | 150 | 180 | 270 | 360 | 720 | 1080;

export type otm = 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55 | 60;

export type optionType = 'C' | 'P';

export interface IChartParams {
  symbol: string,
  otm: otm,
  term: term,
  optionType: optionType,
  fromTime: string,
  toTime: string
}

export interface IChartResponse {
  iv: string;
  time: Date;
}
