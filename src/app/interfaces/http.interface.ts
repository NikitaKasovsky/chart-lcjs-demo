export interface IChartParams {
  symbol: string,
  otm: number,
  term: number, // 7-1080
  optionType: string,
  fromTime: string,
  toTime: string
}

export interface IChartResponse {
  iv: string;
  time: Date;
}
