import { Component, OnInit, Input } from '@angular/core';
import { ProductoPedido } from '../../app/model/producto.model';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-item-carrito',
  templateUrl: './item-carrito.component.html',

})
export class ItemCarritoComponent implements OnInit {

  @Input() productoPedido: ProductoPedido;

  constructor( public carritoService: CarritoService ) { }

  ngOnInit(): void {
  }

  addCarrito(){
    console.log('addCarrito()');
    this.carritoService.addCarrito(this.productoPedido.producto);
  }

  removeCarrito(){
    this.carritoService.removeProducto(this.productoPedido.producto);
  }

}
