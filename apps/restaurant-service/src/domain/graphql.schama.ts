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
  address: AddressInput;
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
    abstract createHome(createRestaurantInput:CreateRestaurantInput): Nullable<Restaurant> | Promise<Nullable<Restaurant>>;

    abstract updateResaurant(id: string, fieldToUpdate:UpdateRestaurantInput): Nullable<Restaurant> | Promise<Nullable<Restaurant>>;

}


type Nullable<T> = T | null;