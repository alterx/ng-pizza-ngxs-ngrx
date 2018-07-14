import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";

import { Effect, Actions } from "@ngrx/effects";

import * as toppingsActions from "../actions/toppings.action";

import * as fromServices from "../../services";

@Injectable()
export class ToppingsEffect {
  constructor(
    private actions$: Actions,
    private toppingsService: fromServices.ToppingsService
  ) {}

  @Effect()
  loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingsService.getToppings().pipe(
        map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
        catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
      );
    })
  );
}
