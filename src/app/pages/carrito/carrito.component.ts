import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Pedido } from '../../app/model/producto.model';
import { CarritoService } from '../../services/carrito.service';
import { Subscription } from 'rxjs';
import { FirestorageService } from '../../services/firestorage.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',

})
export class CarritoComponent implements OnInit, OnDestroy {

  pedido: Pedido;
  carritoSuscribe: Subscription;  
  total: number;
  cantidad: number;

  constructor( public firetoreService: FirestoreService,
               public carritoService: CarritoService,
               public auth: FirebaseauthService) {

              this.loadPedido();
              this.initCarrito();
   }

  ngOnInit()  {
  }

  ngOnDestroy(){
    if(this.carritoSuscribe){
      this.carritoSuscribe.unsubscribe();
    }
  }

  loadPedido(){
    this.carritoSuscribe = this.carritoService.getCarrito().subscribe(resp => {
      this.pedido = resp;
      this.getTotal();
     this.getCantidad();
    });
  }

  initCarrito(){
    this.pedido = {
    id: '',
    cliente: null,
    productos: [],
    precioTotal: null
  };
}

getTotal(){
  this.total = 0;
  this.pedido.productos.forEach(producto => {
  this.total = (producto.producto.precio) * producto.cantidad + this.total;
});
}

getCantidad(){
  this.cantidad =  0;
  this.pedido.productos.forEach(producto => {
  this.cantidad = (producto.cantidad) + this.cantidad;
 });
}

async pedir(){

  if(!this.pedido.productos.length) {
    console.log('añade items al carrito')
    return;
  }
  this.pedido.precioTotal = this.total;
  this.pedido.id = this.firetoreService.verId();
  const uid = await this.auth.getUid();
  const path = 'Clientes/' + uid + '/pedidos/'
  console.log('Pedir--> ', this.pedido, uid, path)
  this.firetoreService.createDoc(this.pedido, path, this.pedido.id).then(() => {
  console.log('pedido con exito')
  this.carritoService.clearCarrito();
  });
  
}

}
