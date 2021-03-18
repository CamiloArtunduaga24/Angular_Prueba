import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Pedido } from '../../app/model/producto.model';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  pedido: Pedido;

  constructor( public firetoreService: FirestoreService,
               public carritoService: CarritoService ) {

              this.loadPedido();
   }

  ngOnInit()  {
  }

  loadPedido(){
    this.pedido = this.carritoService.getCarrito()
  }

}