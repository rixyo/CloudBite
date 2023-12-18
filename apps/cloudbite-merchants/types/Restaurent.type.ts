interface Address {
    street: string;
    city: string;
    state: string;
}
export interface Restaurent {
    id: string;
    name: string;
    banner: string;
    address: Address;
    created_at: string;
}