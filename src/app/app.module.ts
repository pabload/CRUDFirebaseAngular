import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './componentes/login/login.component';
import {FirebaseserviceService} from './servicios/firebaseservice.service';
import { ListaTareasComponent } from './componentes/lista-tareas/lista-tareas.component';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { FormsModule } from '@angular/forms';
import {GuardiaGuard} from './guardia.guard';
import { ModalModule } from 'ngx-bootstrap/modal'

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'lista-tareas', component: ListaTareasComponent, canActivate: [GuardiaGuard] },
  { path: 'registro', component: RegistroComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListaTareasComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [
  FirebaseserviceService,
  GuardiaGuard
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
