
export interface Dish {
    id: string;
    name: string;
    price: number;
    description: string;
    thumbnails: string[];
    dish_type: string;
    restaurant: {
        id: string;
    }
}