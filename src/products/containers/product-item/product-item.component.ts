import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap, withLatestFrom, take, map } from 'rxjs/operators';
import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import {
  SelectPizza,
  CreatePizza,
  UpdatePizza,
  RemovePizza,
} from '../../store/actions/pizzas.action';
import { ProductsState, PizzaState, ToppingsState } from '../../store';
import { VisualizeToppings } from '../../store/actions/toppings.action';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  @Select(PizzaState.getSelectedPizza) pizza$: Observable<Pizza>;
  @Select(ProductsState.getPizzaVisualized) visualise$: Observable<Pizza>;
  // For some reason using this causes multiple subscriptions that just keep growing
  // @Select(ToppingsState.getAllToppings) toppings$: Observable<Topping[]>;
  toppings$: Observable<Topping[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.pizza$
      .pipe(
        tap(pizza => {
          const pizzaExists = !!(pizza && pizza.toppings);
          const toppings = pizzaExists
            ? pizza.toppings.map(topping => topping.id)
            : [];
          this.store.dispatch(new VisualizeToppings(toppings));
        }),
      )
      .subscribe();
    // Using store.select seems to fix the issue, but this code is duplicated from ToppingsState.getAllToppings
    this.toppings$ = this.store
      .select(state => state.products.toppings.entities)
      .pipe(
        map(entities => {
          return Object.keys(entities).map(id => entities[+id]);
        }),
      );
  }

  onSelect(event: number[]) {
    this.store.dispatch(new VisualizeToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    this.store.dispatch(new RemovePizza(event));
  }
}
