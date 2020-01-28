import { Component, OnInit } from '@angular/core';
import {FirebaseserviceService} from './../../servicios/firebaseservice.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public correo:string="";
  public contra: string="";
  public datosVacios:boolean;
  constructor(public servicio:FirebaseserviceService,private router:Router) { }

  ngOnInit() {
  }
   iniciarSesion(){
    this.servicio.Entrar().then(res =>{if(res==true){this.router.navigate(['lista-tareas']);}});
  }
  SalirSesion(){
    this.servicio.Salir();
    
  }
  IniciarSesionCorreo(){
    if( !(this.correo==""|| this.contra=="")){
      this.servicio.EntrarSesionCorreo(this.correo,this.contra).then(res =>{if(res==true){this.router.navigate(['lista-tareas']);}});
    }else{
      this.datosVacios= true;
    }
    
  }
}
