import { Pizza } from '../../models/pizza.model';

// load pizzas
export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Success';

export class LoadPizzas {
  static readonly type = LOAD_PIZZAS;
}

export class LoadPizzasFail {
  static readonly type = LOAD_PIZZAS_FAIL;

  constructor(public payload: any) {}
}

export class LoadPizzasSuccess {
  readonly type = LOAD_PIZZAS_SUCCESS;
  static type = LOAD_PIZZAS_SUCCESS;

  constructor(public payload: Pizza[]) {}
}

// create pizzas
export const CREATE_PIZZA = '[Products] Create Pizza';
export const CREATE_PIZZA_FAIL = '[Products] Create Pizza Fail';
export const CREATE_PIZZA_SUCCESS = '[Products] Create Pizza Success';

export class CreatePizza {
  static readonly type = CREATE_PIZZA;

  constructor(public payload: Pizza) {}
}

export class CreatePizzaFail {
  static readonly type = CREATE_PIZZA_FAIL;

  constructor(public payload: any) {}
}

export class CreatePizzaSuccess {
  static readonly type = CREATE_PIZZA_SUCCESS;

  constructor(public payload: Pizza) {}
}

// update pizzas
export const UPDATE_PIZZA = '[Products] Update Pizza';
export const UPDATE_PIZZA_FAIL = '[Products] Update Pizza Fail';
export const UPDATE_PIZZA_SUCCESS = '[Products] Update Pizza Success';

export class UpdatePizza {
  static readonly type = UPDATE_PIZZA;

  constructor(public payload: Pizza) {}
}

export class UpdatePizzaFail {
  static readonly type = UPDATE_PIZZA_FAIL;

  constructor(public payload: any) {}
}

export class UpdatePizzaSuccess {
  static readonly type = UPDATE_PIZZA_SUCCESS;

  constructor(public payload: Pizza) {}
}

// remove pizzas
export const REMOVE_PIZZA = '[Products] Remove Pizza';
export const REMOVE_PIZZA_FAIL = '[Products] Remove Pizza Fail';
export const REMOVE_PIZZA_SUCCESS = '[Products] Remove Pizza Success';

export class RemovePizza {
  static readonly type = REMOVE_PIZZA;

  constructor(public payload: Pizza) {}
}

export class RemovePizzaFail {
  static readonly type = REMOVE_PIZZA_FAIL;

  constructor(public payload: any) {}
}

export class RemovePizzaSuccess {
  static readonly type = REMOVE_PIZZA_SUCCESS;

  constructor(public payload: Pizza) {}
}

// selected Pizza action
export class SelectPizza {
  static readonly type = '[Pizzas] Select Pizza';

  constructor(public readonly payload: number) {}
}

// action types
export type PizzasAction =
  | LoadPizzas
  | LoadPizzasFail
  | LoadPizzasSuccess
  | CreatePizza
  | CreatePizzaFail
  | CreatePizzaSuccess
  | UpdatePizza
  | UpdatePizzaFail
  | UpdatePizzaSuccess
  | RemovePizza
  | RemovePizzaFail
  | RemovePizzaSuccess;
