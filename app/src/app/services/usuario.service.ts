import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { resolve } from 'dns';
import { rejects } from 'assert';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;

  constructor(private storage: Storage, private http: HttpClient) { }

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

  async guardarToken(token: string){
    this.token = token;

    await this.storage.set('token', token);
  }

}
