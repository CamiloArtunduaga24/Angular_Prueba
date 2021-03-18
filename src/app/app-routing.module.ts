import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CarritoComponent } from './pages/carrito/carrito.component';


const routes: Routes = [

 { path: 'productos', component: ProductosComponent },
 { path: 'producto/:id', component: ProductoComponent},
 { path: 'perfil', component: PerfilComponent},
 { path: 'carrito', component:  CarritoComponent},
 { path: '**', redirectTo:'productos', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
