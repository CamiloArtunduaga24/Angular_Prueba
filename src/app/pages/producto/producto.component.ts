import { Component, OnInit } from '@angular/core';

import { productModel, Producto } from '../../app/model/producto.model';
import { FirestoreService } from '../../services/firestore.service';
import { FirestorageService } from '../../services/firestorage.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

 productos: Producto[]=[];

 newProducto:  Producto ;

 newEnable = false;

 private path =  'Productos/'

 newImg = '';
 newFile= '';
  

  constructor( private firestoreService: FirestoreService,
                public firestorageService: FirestorageService ) { }

  ngOnInit(): void {
    this.verProductos();
  }

  async guardar(){
    const path= 'Productos';
    const name= this.newProducto.nombre;
    if(this.newFile !== undefined){
      const resp = await this.firestorageService.uploapImg(this.newFile, path,name);
      this.newProducto.img= resp;
    }
    this.firestoreService.createDoc(this.newProducto, this.path , this.newProducto.id);
    this.guardar();
    const id= this.firestoreService.verId();
    }
  

  verProductos(){
    this.firestoreService.verCollection<Producto>(this.path).subscribe(resp => {
      this.productos = resp;
    });
  }

  deleteProductos( producto: Producto ) {
    this.firestoreService.deleteDoc(this.path, producto.id );
  }

  nuevoItem(){
    this.newEnable = true;
    this.newProducto = {
      id: this.firestoreService.verId(),
      nombre: '',
      precio: null,
      descripcion: '',
      img: '',
      fecha: new Date()
    }
  }

  async newImage(event: any) {
     if (event.target.files && event.target.files[0]){
       this.newFile= event.target.files[0];
       const reader = new FileReader();
       reader.onload = ((image) =>{
         this.newProducto.img = image.target.result as string;

       });
       reader.readAsDataURL(event.target.files[0]);
     }

  }
}
