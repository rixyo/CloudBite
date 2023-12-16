export interface Restaurant {
    id: string;
    banner: string;
    name: string;
}
export interface GetRestaurentsByLocationResponse {
   id: string;
    restaurant: Restaurant;
}