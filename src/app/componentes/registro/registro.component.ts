import { Component, OnInit } from '@angular/core';
import {FirebaseserviceService} from '../../servicios/firebaseservice.service'
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public email:string="";
  public contra:string="";
  public datosVacios:BehaviorSubject<boolean> = new BehaviorSubject(false);
  public cuentaCreada:BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private servicio:FirebaseserviceService) { }

  ngOnInit() {
  }

  RegistrarUsuario(){
    if(!(this.email==""|| this.contra=="")){
      this.servicio.RegistrarUsuarioCorreo(this.email,this.contra).then(
      res=>{if(res==true){
        this.cuentaCreada.next(true);
        this.datosVacios.next(false);
        this.email="";
        this.contra="";
      }
    });
    }else{
      this.datosVacios.next(true);
      return;
    }
  }

}
