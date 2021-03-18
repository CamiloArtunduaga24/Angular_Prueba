import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Producto } from '../../app/model/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  private path = 'Productos/'
  productos: Producto[] = [];

  constructor(public firestoreService: FirestoreService) { 
    this.loadProduct();
  }

  ngOnInit(): void {
   
  }

  loadProduct(){
    this.firestoreService.verCollection<Producto>(this.path).subscribe(resp => {
      // console.log(resp)
      this.productos = resp;
    })
  }

}
