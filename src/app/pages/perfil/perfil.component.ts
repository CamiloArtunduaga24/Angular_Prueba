import { Component, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import { Cliente } from 'src/app/app/model/producto.model'
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestorageService } from '../../services/firestorage.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  cliente: Cliente ={
    uid: '',
    nombre: '',
    email:'',
    password: ''
  }

  uid = '';
  susUserInfo : Subscription;
  ingresarEnable = false;

  constructor(public auth: FirebaseauthService,
              public firestorageService: FirestorageService,
              public firestoreService: FirestoreService ) {
              
              this.auth.stateAuth().subscribe(resp => {
                console.log(resp);
                if(resp !== null){
                  this.uid = resp.uid;
                  this.getUserInfo(this.uid);
                }else{
                  this.clean();
                              }
              });

}

clean(){
  this.uid='';
  this.cliente ={
      uid: '',
      nombre: '',
      email:'',
      password: ''
    }   
    console.log(this.cliente);
}

  async ngOnInit() {

    const uid = await this.auth.getUid();
    console.log(uid);
  }

  async registrarse(){
    const credenciales = {
      email: this.cliente.email,
      password: this.cliente.password
    };
    const res = await this.auth.registrar(credenciales.email, credenciales.password).catch(err =>{
      console.log('err ->', err)
    });
    const uid = await this.auth.getUid();
    this.cliente.uid = uid;
    this.guardarUsuario();
  }

  async guardarUsuario(){
    const path= 'Cliente';
    const name= this.cliente.nombre;
    this.firestoreService.createDoc(this.cliente, path , this.cliente.uid).then(res => {
      console.log('guardado con exito')
    }).catch(err => {

    });
    }

  async salir(){
  this.auth.logout();
  this.susUserInfo.unsubscribe();  
  }

  getUserInfo( uid: string){
    console.log('getUserInfo');
    const path = 'Cliente';
    this.susUserInfo= this.firestoreService.getDoc<Cliente>(path,  uid).subscribe(resp => {
      this.cliente = resp ;

    });
  }

  ingresar(){
    const credenciales = {
      email: this.cliente.email,
      password: this.cliente.password
    };
    this.auth.login(credenciales.email, credenciales.password).then(resp =>{
      console.log('ingreso con exito')
    })

  }


 

}
