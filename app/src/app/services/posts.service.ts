import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post, Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx'; 

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    private usuarioService: UsuarioService,
    private fileTransfer: FileTransfer) { }

  getPosts(pull: boolean = false){
    if(pull){
      this.paginaPosts = 0;
    }
    this.paginaPosts ++;
    return this.http.get<RespuestaPosts>(`${url}/post/?pagina=${this.paginaPosts}`);
  }

  crearPost(post: Post){
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise( resolve => {
      return this.http.post(`${url}/post/`, post, { headers }).subscribe( result => {
        console.log(result);
        if(result['ok']){
          this.nuevoPost.emit(result['post']);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    })
  }


  subirImagen(img: string){
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.usuarioService.token
      }
    };

    const fileTransfer : FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(img, `${url}/post/upload`, options).then( data => {
      console.log(data);
    }).catch( error => {
      console.log('Error en carga de archivos',error);
    });
  }
  
}
