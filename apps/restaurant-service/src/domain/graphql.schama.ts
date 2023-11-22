/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateRestaurantInput {
  name: string;
  description: string;
  banner: string;
  address: AddressInput;
}
export class CreateDishInput {
  name: string;
  description: string;
  cuisine_type: string;
  meal_type: string;
  ingredients: string;
  price: number;
  thumbnails: string[];
}
export class UpdateDishInput {
  name: string;
  description: string;
  cuisine_type: string;
  meal_type: string;
  ingredients: string;
  price: number;
  thumbnails: string[];
}
export class UpdateDishItemParamDto {
  id: string;
  dish_id: string;
}
export class RestaurantParamParamDto {
  id: string;
}
export class RestaurantDish {
  id: string;
  name: string;
  description: string;
  meal_type: string;
  thumbnails: string[];
  price: number;
  restaurant: Restaurant;

}
class AddressInput {
  city: string;
  street: string;
  country: string;
  state: string;
}
class Address{
    city: string;
    street: string;
    country: string;
    state: string;
}
export class UpdateRestaurantInput {
  name: string;
  description: string;
  banner: string;
  delivery_options: string;
  pickup_options: string;
}

export class Restaurant {
    id: string;
    name: string;
    description: string;
    owner_id: string;
    cuisine: string;
    banner: string;
    delivery_options: string;
    pickup_options: string;
    address: Address;
}



export abstract class IQuery {
  abstract restaurants(page: Nullable<number>):
    | Nullable<Restaurant[]>
    | Promise<Nullable<Restaurant[]>>;
  abstract userRestaurant():
    | Nullable<Restaurant[]>
    | Promise<Nullable<Restaurant[]>>;

  abstract restaurant(id?: Nullable<string>): Restaurant | Promise<Restaurant>;
}

export abstract class IMutation {
    abstract createRestaurant(createRestaurantInput:CreateRestaurantInput): Nullable<Restaurant> | Promise<Nullable<Restaurant>>;

    abstract updateRestaurant(id: string, fieldToUpdate:UpdateRestaurantInput): Nullable<Restaurant> | Promise<Nullable<Restaurant>>;
    abstract createDish(createDishInput:CreateDishInput): Nullable<RestaurantDish> | Promise<Nullable<RestaurantDish>>;
    abstract updateDish(id: string, fieldToUpdate:UpdateDishInput): Nullable<RestaurantDish> | Promise<Nullable<RestaurantDish>>;
}


type Nullable<T> = T | null;