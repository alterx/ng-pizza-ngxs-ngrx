import { State, StateContext, Action, Selector } from '@ngxs/store';
import {
  LoadPizzas,
  LoadPizzasSuccess,
  LoadPizzasFail,
  SelectPizza,
  CreatePizza,
  CreatePizzaSuccess,
  CreatePizzaFail,
  RemovePizza,
  UpdatePizza,
} from '../actions/pizzas.action';
import { PizzasService } from '../../services';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Pizza } from '../../models/pizza.model';
import { ToppingsState } from './toppings.state';
import { Navigate } from '@ngxs/router-plugin';

export class PizzaStateModel {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
  selectedPizza: Pizza = {};
}

@State<PizzaStateModel>({
  name: 'pizzas',
  defaults: {
    entities: {},
    loaded: false,
    loading: false,
    selectedPizza: {},
  },
})
export class PizzaState {
  constructor(private pizzaService: PizzasService) {}

  @Selector()
  static getSelectedPizza(state: PizzaStateModel) {
    return state.selectedPizza;
  }

  @Selector()
  static allPizzasLoaded(state: PizzaStateModel) {
    return state.loaded;
  }

  @Selector()
  static getAllPizzasEntities(state: PizzaStateModel) {
    return state.entities;
  }

  @Action(LoadPizzas)
  loadPizzas(
    { dispatch, patchState }: StateContext<PizzaStateModel>,
    loadPizzas: LoadPizzas,
  ) {
    patchState({
      loading: true,
    });

    return this.pizzaService
      .getPizzas()
      .pipe(
        map(pizzas => dispatch(new LoadPizzasSuccess(pizzas))),
        catchError(error => dispatch(of(new LoadPizzasFail(error)))),
      );
  }

  @Action(LoadPizzasSuccess)
  loadPizzasSuccess(
    { getState, patchState }: StateContext<PizzaStateModel>,
    { payload }: LoadPizzasSuccess,
  ) {
    const pizzas = payload;

    const entities = pizzas.reduce(
      (entities: { [id: number]: Pizza }, pizza) => {
        return {
          ...entities,
          [pizza.id]: pizza,
        };
      },
      {
        ...getState().entities,
      },
    );

    patchState({
      loaded: true,
      loading: false,
      entities,
    });
  }

  @Action(LoadPizzasFail)
  loadPizzasFail(
    { patchState }: StateContext<PizzaStateModel>,
    { payload }: LoadPizzasFail,
  ) {
    patchState({
      loaded: false,
      loading: false,
    });
  }

  @Action(SelectPizza)
  selectPizza(
    { getState, patchState }: StateContext<PizzaStateModel>,
    { payload }: SelectPizza,
  ) {
    const selectedPizza = getState().entities[payload];

    patchState({
      selectedPizza,
    });
  }

  @Action(CreatePizza)
  createPizza(
    { dispatch }: StateContext<PizzaStateModel>,
    { payload }: CreatePizza,
  ) {
    return this.pizzaService
      .createPizza(payload)
      .pipe(
        map(pizza => dispatch(new CreatePizzaSuccess(pizza))),
        catchError(err => dispatch(new CreatePizzaFail(err))),
      );
  }

  @Action(CreatePizzaSuccess)
  createPizzaSuccess(
    { getState, patchState, dispatch }: StateContext<PizzaStateModel>,
    { payload }: CreatePizzaSuccess,
  ) {
    const entities = {
      ...getState().entities,
      [payload.id]: payload,
    };

    patchState({
      entities,
    });

    dispatch(new Navigate(['/products']));
  }

  @Action(UpdatePizza)
  updatePizza(
    { getState, patchState, dispatch }: StateContext<PizzaStateModel>,
    { payload }: UpdatePizza,
  ) {
    return this.pizzaService.updatePizza(payload).pipe(
      tap(pizza => {
        const entities = {
          ...getState().entities,
          [payload.id]: payload,
        };

        patchState({
          entities,
        });
      }),
      tap(() => {
        dispatch(new Navigate(['/products']));
      }),
    );
  }

  @Action(RemovePizza)
  deletePizza(
    { getState, patchState, dispatch }: StateContext<PizzaStateModel>,
    { payload }: RemovePizza,
  ) {
    const pizza = payload;

    return this.pizzaService.removePizza(payload).pipe(
      tap(() => {
        const { [pizza.id]: removed, ...result } = getState().entities;

        patchState({
          entities: result,
        });
      }),
      tap(() => {
        dispatch(new Navigate(['/products']));
      }),
    );
  }
}
