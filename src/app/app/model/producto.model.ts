

export class productModel {
    id: string;
    nombre: string;
    precio: number;
    descripcion: string;
    img: string;
}

export interface Producto {
    id: string;
    nombre: string;
    precio: number;
    descripcion: string;
    img:string;
    fecha: Date;
}

export interface Cliente {
    uid: string;
    nombre: string;
    email:string;
    password: string;

}

export interface Pedido {
    id: string;
    cliente: Cliente;
    productos: ProductoPedido[];
    precioTotal: number;
    
}
 export interface ProductoPedido{
    producto: Producto;
    cantidad: number;
}

