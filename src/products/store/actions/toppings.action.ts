import { Topping } from "../../models/topping.model";

export const LOAD_TOPPINGS = "[Products] Load Toppings";
export const LOAD_TOPPINGS_FAIL = "[Products] Load Toppings Fail";
export const LOAD_TOPPINGS_SUCCESS = "[Products] Load Toppings Success";
export const VISUALISE_TOPPINGS = "[Products] Visualise Toppings";

export class LoadToppings {
  static readonly type = LOAD_TOPPINGS;
}

export class LoadToppingsFail {
  static readonly type = LOAD_TOPPINGS_FAIL;

  constructor(public payload: any) {}
}

export class LoadToppingsSuccess {
  static readonly type = LOAD_TOPPINGS_SUCCESS;

  constructor(public payload: Topping[]) {}
}

export class VisualizeToppings {
  static readonly type = VISUALISE_TOPPINGS;

  constructor(public payload: number[]) {}
}

// action types

export type ToppingsAction =
  | LoadToppings
  | LoadToppingsFail
  | LoadToppingsSuccess
  | VisualizeToppings;
