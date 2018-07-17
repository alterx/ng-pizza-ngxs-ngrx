import { Action, State, StateContext, Selector } from "@ngxs/store";
import { of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Topping } from "../../models/topping.model";
import { ToppingsService } from "../../services";
import { LoadPizzas } from "../actions/pizzas.action";
import {
  LoadToppings,
  LoadToppingsFail,
  LoadToppingsSuccess,
  VisualizeToppings
} from "../actions/toppings.action";

export class ToppingsStateModel {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

@State<ToppingsStateModel>({
  name: "toppings",
  defaults: {
    entities: {},
    loaded: false,
    loading: false,
    selectedToppings: []
  }
})
export class ToppingsState {
  constructor(private toppingsService: ToppingsService) {}

  @Selector()
  static getAllToppingsLoaded(state: ToppingsStateModel) {
    return state.loaded;
  }

  @Selector()
  static getAllToppings(state: ToppingsStateModel) {
    console.log("toppings");
    console.log(state);
    const result = Object.keys(state.entities).map(id => state.entities[+id]);
    console.log(result);
    return result;
  }

  @Selector()
  static getSelectedToppingsEntities(state: ToppingsStateModel) {
    return state.selectedToppings.map(toppingId => state.entities[toppingId]);
  }

  @Action(LoadToppings)
  loadToppings(
    { patchState, dispatch }: StateContext<ToppingsStateModel>,
    loadPizzas: LoadPizzas
  ) {
    patchState({
      loading: true
    });

    return this.toppingsService
      .getToppings()
      .pipe(
        map(
          toppings => dispatch(new LoadToppingsSuccess(toppings)),
          catchError(err => dispatch(of(new LoadToppingsFail(err))))
        )
      );
  }

  @Action(LoadToppingsSuccess)
  loadToppingsSuccess(
    { patchState, getState }: StateContext<ToppingsStateModel>,
    { payload }: LoadToppingsSuccess
  ) {
    const toppings = payload;

    const entities = toppings.reduce(
      (entities: { [id: number]: Topping }, topping: Topping) => {
        return {
          ...entities,
          [topping.id]: topping
        };
      },
      {
        ...getState().entities
      }
    );

    patchState({
      loaded: true,
      loading: false,
      entities
    });
  }

  @Action(LoadToppingsFail)
  loadToppingsFail(
    { patchState }: StateContext<ToppingsStateModel>,
    { payload }: LoadToppingsFail
  ) {
    patchState({
      loaded: false,
      loading: false
    });
  }

  @Action(VisualizeToppings)
  visualizeToppings(
    { patchState }: StateContext<ToppingsStateModel>,
    { payload }: VisualizeToppings
  ) {
    console.log(payload);
    patchState({
      selectedToppings: payload
    });
  }
}
