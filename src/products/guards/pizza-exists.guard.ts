import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, tap, take } from 'rxjs/operators';
import { Pizza } from '../models/pizza.model';
import { LoadPizzas, SelectPizza } from '../store/actions/pizzas.action';
import { PizzaState } from '../store/state/pizza.state';

@Injectable()
export class PizzaExistsGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = +route.params.pizzaId;
        return this.hasPizza(id);
      }),
    );
  }

  hasPizza(id: number): Observable<boolean> {
    return this.store.selectOnce(PizzaState.getAllPizzasEntities).pipe(
      map((entities: { [id: number]: Pizza }) => entities[id]),
      switchMap(pizza => {
        if (!!pizza) {
          return this.store
            .dispatch(new SelectPizza(pizza.id))
            .pipe(switchMap(() => of(true)));
        }
        return of(false);
      }),
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.selectOnce(PizzaState.allPizzasLoaded).pipe(
      switchMap((loaded: boolean) => {
        if (!loaded) {
          return this.store.dispatch(new LoadPizzas());
        }
        return of(true);
      }),
      take(1),
    );
  }
}
