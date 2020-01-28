import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage  } from '@angular/fire/storage';
import { tareas } from '../tareas.module';
@Injectable({
  providedIn: 'root'
})
export class FirebaseserviceService {

  private itemDoc: AngularFirestoreDocument<tareas>;
  constructor(public afAuth: AngularFireAuth, public router:Router, public  db: AngularFirestore, public storage:AngularFireStorage) { }
  Entrar(){
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(function onSuccess(...args) {
      console.log('onSuccess', args);
      return true;
    })
      .catch(function onFailure(err) {
        console.log('onFailure', err);
        return false;
      });  
  }
  RegistrarUsuarioCorreo(correo:string,contra:string){
     return this.afAuth.auth.createUserWithEmailAndPassword(correo,contra).then(function onSuccess(...args) {
      console.log('onSuccess', args);
      return true;
    })
      .catch(function onFailure(err) {
        console.log('onFailure', err);
        return false;
      });  
  }
  EntrarSesionCorreo(correo:string,contra:string){
     return this.afAuth.auth.signInWithEmailAndPassword(correo,contra).then(function onSuccess(...args) {
      console.log('onSuccess', args);
      return true;
    })
      .catch(function onFailure(err) {
        console.log('onFailure', err);
        return false;
      });  
  }
  Salir() {
    return this.afAuth.auth.signOut().then(function onSuccess(...args) {
      console.log('onSuccess', args);
      return true;
    })
      .catch(function onFailure(err) {
        console.log('onFailure', err);
        return false;
      });  
  }
  EditarTarea(tarea,id){
    this.itemDoc= this.db.doc<tareas>(`tareas/${id}`);
    return this.itemDoc.update(tarea);
  }
  EliminarTarea(tarea){
    this.storage.ref(tarea.refimagen).delete();
    this.itemDoc= this.db.doc<tareas>(`tareas/${tarea.id}`);
    return this.itemDoc.delete();
  }


}
