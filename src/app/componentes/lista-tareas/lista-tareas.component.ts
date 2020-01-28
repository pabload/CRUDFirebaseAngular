import { Component, OnInit, ViewChild } from '@angular/core';
import {FirebaseserviceService} from '../../servicios/firebaseservice.service'
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {tareas} from '../../tareas.module';
import { map } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css']
})
export class ListaTareasComponent implements OnInit {
  tareas: Observable<any[]>;
  nombreTarea:string;
  fechaTarea:string;
  prioridadTarea:string;
  idUsuario:string;
  NombreImagen:string;
  Imagen:File;
  downloadURL:Observable<string>;
  imageUrl: string;
  @ViewChild('modal',{static: false}) public modal:ModalDirective;
  /////////////////////////////
  nombreTareaModificar:string;
  fechaTareaModificar:string;
  prioridadTareaModificar:string;
  idTarea:string;
  tareaModificada:any ={
     nombre:"",
     fecha:"",
     prioridad:""
  }
  constructor(private servicio:FirebaseserviceService, private router:Router) { }
  ngOnInit() {
    this.servicio.afAuth.authState.subscribe(user => {
      if(user) {       
        this.idUsuario=user.uid;
        this.tareas = this.servicio.db.collection('tareas', ref => ref.where('idUsuario', '==', user.uid)).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as tareas;
            const id = a.payload.doc.id;
            //alert(id);
            return { id, ...data };
          }))
        );
      }
    });
  }
  CerrarSesion(){
    this.servicio.Salir().then(res=>{if(res==true){this.router.navigate(['']);}})
  }
  RegistrarTarea(urlimagen){
    this.servicio.db.collection('tareas').add({
      nombre:this.nombreTarea,
      fecha:this.fechaTarea,
      prioridad:this.prioridadTarea,
      idUsuario:this.idUsuario,
      url:urlimagen,
      refimagen:this.NombreImagen
    }).then(res=>{
      this.nombreTarea="";
      this.fechaTarea="";
      this.prioridadTarea="";
      this.NombreImagen="";
    });
  }
  RealizarOperacion() {
    const task = this.servicio.storage.upload(this.NombreImagen, this.Imagen);
    const ref = this.servicio.storage.ref(this.NombreImagen);
    return task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL()
        this.downloadURL.subscribe(url => (this.RegistrarTarea(url)));
      })
    )
    .subscribe();
  }
  uploadSingle(event) {
    this.NombreImagen = event.target.files[0].name;
    this.Imagen=event.target.files[0];
  
  }
  EditarPrimero(tarea){
    this.idTarea=tarea.id
    this.nombreTareaModificar= tarea.nombre;
    this.fechaTareaModificar = tarea.fecha;
    this.prioridadTareaModificar= tarea.prioridad;

  }
  RealizarModificacion(){
    this.tareaModificada.nombre = this.nombreTareaModificar
    this.tareaModificada.fecha =  this.fechaTareaModificar;
    this.tareaModificada.prioridad= this.prioridadTareaModificar;
    this.servicio.EditarTarea(this.tareaModificada,this.idTarea).then(res=>{
      this.nombreTareaModificar="";
      this.fechaTareaModificar="";
      this.prioridadTareaModificar="";
    });
  }
  EliminarTarea(tarea){
    this.servicio.EliminarTarea(tarea);
  }
  

}
