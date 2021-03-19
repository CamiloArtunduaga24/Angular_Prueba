import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})


export class FirestoreService {
    constructor(public database: AngularFirestore){}


   createDoc(data: any, path: string, id:string){
     const collection = this.database.collection(path);
     return collection.doc(id).set(data);
   }
   getDoc<tipo>(path: string, id:string ) {
     const collection = this.database.collection<tipo>(path);
     return collection.doc(id).valueChanges();
   }

   deleteDoc(path: string, id:string ) {
     const collection = this.database.collection(path);
     return collection.doc(id).delete();
   }

   updateDoc(data:any, path: string, id:string ) {
     const collection = this.database.collection(path);
     return collection.doc(id).update(data);
   }

   verId(){
     return this.database.createId()
   }

   verCollection<tipo>(path: string) {
     const collection = this.database.collection<tipo>(path);
     return collection.valueChanges();
   }

}

 