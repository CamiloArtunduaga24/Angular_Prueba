import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire'
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirestoreService } from './services/firestore.service';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PagesComponent } from './pages/pages.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ItemCarritoComponent } from './pages/item-carrito/item-carrito.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductoComponent,
    ProductosComponent,
    PagesComponent,
    PerfilComponent,
    CarritoComponent,
    ItemCarritoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    AppRoutingModule,
    AngularFireStorageModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  exports:[
    ItemCarritoComponent,
  ],
  providers: [FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
