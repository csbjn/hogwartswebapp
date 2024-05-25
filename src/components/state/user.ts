export interface User {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    homeAddress: UserAddress;
    notificationAddress: UserAddress;
    house: string;
}

export interface UserAddress {
    name: string;
    country: string;
    city: string;
    street: string;
    zip: string,
}