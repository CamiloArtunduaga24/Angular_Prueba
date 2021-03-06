import { Component, OnInit , Input} from '@angular/core';
import { Producto } from '../app/model/producto.model';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
 @Input() producto: Producto;

  constructor(public carritoService: CarritoService) { 

  }

  ngOnInit(){
    
  }

  addCarrito(){
    console.log('addCarrito()');
    this.carritoService.addCarrito(this.producto);
  }

}
