import { HttpParams } from '@angular/common/http';

export interface InputParamsInterface {
  [param: string]: string | ReadonlyArray<string>;
}

export function getHttpParams(args: any): HttpParams {
  for (const argsKey in args as InputParamsInterface) {
    if (args[argsKey] === null || args[argsKey] === undefined) {
      delete args[argsKey];
    }
  }

  return new HttpParams({
    fromObject: args
  });
}
