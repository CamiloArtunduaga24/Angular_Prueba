import { Component, OnInit, Input } from '@angular/core';
import { ProductoPedido } from '../../app/model/producto.model';

@Component({
  selector: 'app-item-carrito',
  templateUrl: './item-carrito.component.html',
  styleUrls: ['./item-carrito.component.css']
})
export class ItemCarritoComponent implements OnInit {

  @Input() productoPedido: ProductoPedido;

  constructor() { }

  ngOnInit(): void {
  }

}
