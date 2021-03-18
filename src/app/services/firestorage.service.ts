import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(public angularFireStorage: AngularFireStorage ) { }

  uploapImg(file: any, path:string, nombre: string): Promise<string>{
    return new Promise ( resolve =>{
      
      const filePath = path + '/' + nombre;
      const ref = this.angularFireStorage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
           ref.getDownloadURL().subscribe(resp => {
             const downloadURL = resp;
             resolve(downloadURL);
             return;
           })

        }) 
     )
    .subscribe();
      
    });
  }
}
