import { State, Selector, Action, StateContext } from '@ngxs/store';
import { PizzaState, PizzaStateModel } from './pizza.state';
import { ToppingsStateModel, ToppingsState } from './toppings.state';

interface ProductsStateModel {
  pizzas: PizzaStateModel;
  toppings: ToppingsStateModel;
}

@State<ProductsStateModel>({
  name: 'products',
  children: [PizzaState, ToppingsState],
})
export class ProductsState {
  @Selector()
  static getAllPizzas(state: ProductsStateModel) {
    const entities = state.pizzas.entities;
    return Object.keys(entities).map(id => entities[+id]);
  }

  @Selector()
  static getAllToppings(state: ProductsStateModel) {
    const entities = state.toppings.entities;
    return Object.keys(entities).map(id => entities[+id]);
  }

  @Selector()
  static getPizzaVisualized(state: ProductsStateModel) {
    const selectedPizza = PizzaState.getSelectedPizza(state.pizzas);
    const toppings = ToppingsState.getSelectedToppingsEntities(state.toppings);

    const result = {
      ...selectedPizza,
      toppings,
    };

    return result;
  }
}
