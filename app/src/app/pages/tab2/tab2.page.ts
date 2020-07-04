import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { PostsService } from '../../services/posts.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Post } from '../../interfaces/interfaces';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  tempImages: string[]=[];

  post: Post = {
    mensaje: '',
    coordenadas: '',
    position: false
  }

  constructor(
    private usuarioService: UsuarioService,
    private postService: PostsService,
    private uiService: UiServiceService,
    private navCtrl: NavController) {}

  ngOnInit(){

  }

  async crearPost(){
    console.log(this.post);
    const creado = await this.postService.crearPost(this.post)
      if(creado) {
        this.post = {
          mensaje: '',
          coordenadas: '',
          position: false
        };
        this.uiService.toastInformativo('Post creado exitosamente!', 'success');
        this.navCtrl.navigateRoot('/main/tabs/tab1');
      }
   
  }

}
