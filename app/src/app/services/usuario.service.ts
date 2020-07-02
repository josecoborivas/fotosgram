import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { UiServiceService } from './ui-service.service';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private navCtrl: NavController,
    private uiService: UiServiceService) { }


  getUsuario(){
    if(!this.usuario._id) {
      this.validarToken();
    }
    return {...this.usuario};
  }

  login(email: string, password: string){
    const data = {email, password};

    return new Promise(resolve => {
      this.http.post(`${url}/user/login`, data).subscribe(result => {
        console.log(result);
        if(result['ok']){
          this.guardarToken(result['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  registro(usuario: Usuario){
    return new Promise( resolve => {
      this.http.post(`${url}/user/create`, usuario).subscribe(result => {
        console.log(result);
        if(result['ok']){
          this.guardarToken(result['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      })
    });
  }

  async guardarToken(token: string){
    this.token = token;

    await this.storage.set('token', token);
  }

  async cargarToken(){
    this.token = await this.storage.get('token') || null;
  }

  async validarToken(): Promise<boolean>{
    await this.cargarToken();

    if(!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    } 

    return new Promise<boolean>( resolve => {
      const headers = new HttpHeaders({
        'x-token' : this.token
      });

      this.http.get(`${url}/user`, { headers }).subscribe( result => {
        if(result['ok']) {
          this.usuario = result['usuario'];
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }

  actulizarUsuario(usuario: Usuario) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise( resolve => {
      this.http.post(`${url}/user/update`, usuario, { headers }).subscribe( result => {
        if(result['ok']) {
          this.guardarToken(result['token']);
          resolve(true);
        } else {
          this.uiService.alertaInformativa('No se pudo actualizar el usuario.');
          resolve(false);
        }
      });
    });

  }

}
