import { Injectable } from '@angular/core';
import { Producto, Pedido, Cliente, ProductoPedido } from '../app/model/producto.model';
import { FirebaseauthService } from './firebaseauth.service';
import { FirestoreService } from './firestore.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

 private pedido: Pedido;
 pedido$ = new Subject<Pedido>();

 path  = 'carrito/';
 uid = '';
 cliente : Cliente;

  constructor(public auth: FirebaseauthService,
              public firestoreService: FirestoreService,
              public router: Router ) {  

      this.auth.stateAuth().subscribe(resp => {
        console.log(resp);
          if(resp !== null){
            this.uid = resp.uid;
            this.loadCliente()
            
          }
      });
  }

  getCarrito():Observable<Pedido>{
    
    return this.pedido$.asObservable();
  }
  

  loadCarrito(){
    const path = 'Clientes/' + this.uid + '/' + 'carrito';
    this.firestoreService.getDoc<Pedido>(path, this.uid).subscribe (resp => {
      console.log(resp);
        if( resp ) {
         this.pedido = resp;
          this.pedido$.next(this.pedido);
        }else{

          this.initCarrito();
        }
    });
  }

  initCarrito(){
          this.pedido = {
          id: this.uid,
          cliente: this.cliente,
          productos: [],
          precioTotal: null
        };
        this.pedido$.next(this.pedido);
  }

  loadCliente(){
      const path = 'Cliente'
      this.firestoreService.getDoc<Cliente>(path, this.uid).subscribe(resp => {
      this.cliente = resp ;
      this.loadCarrito();
      });
    }
  
  

  addCarrito(producto: Producto){

    console.log('addProducto ->', this.uid); 

    if(this.uid.length) {
      const item = this.pedido.productos.find(productoPedido => {
        return(productoPedido.producto.id === producto.id)
      });
      if(item !== undefined){
        item.cantidad ++;
      }else{
        const add :ProductoPedido = {
          cantidad: 1 ,
          producto,
        }
        this.pedido.productos.push(add )
      } 
    }else{
      this.router.navigate(['/perfil']);
      return;
    }
    console.log('en add pedido' , this.pedido);
   const path = 'Clientes/' + this.uid + '/' + this.path;
    this.firestoreService.createDoc(this.pedido, path, this.uid).then(resp =>{
      console.log('añadido con exito al carrito', resp); 
    });

  }

  removeProducto(producto: Producto){

        console.log('removeProducto ->', this.uid); 

        if(this.uid.length) {
            let position = 0;
            const item = this.pedido.productos.find( (productoPedido, index) => {
              position = index;
              return(productoPedido.producto.id === producto.id)
            });
              if(item !== undefined){
                item.cantidad --;
                if(item.cantidad === 0) {
                  this.pedido.productos.splice(position, 1);
                }
                console.log('en remove pedido' , this.pedido);
                const path = 'Clientes/' + this.uid + '/' + this.path;
                this.firestoreService.createDoc(this.pedido, path, this.uid).then(resp =>{
                console.log('removido con exito ', resp); 
                });
            }
        }           
  }

  realizarPedido(){

  }

  clearCarrito(){

  }
}
