export interface User {
    id: number;
    email: string;
    full_name: string;
    role: "admin" | "customer";
    is_active: boolean;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image_url?: string;
    stock: number;
    is_available: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}
