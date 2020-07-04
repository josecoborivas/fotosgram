import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { PostsService } from '../../services/posts.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Post } from '../../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  tempImages: string[]=[];

  post: Post = {
    mensaje: '',
    coord: '',
    position: false
  }

  mostrarGeo = false;

  constructor(
    private usuarioService: UsuarioService,
    private postService: PostsService,
    private uiService: UiServiceService,
    private navCtrl: NavController,
    private geolocation: Geolocation) {}

  ngOnInit(){

  }



  

  async crearPost(){
    console.log(this.post);
    const creado = await this.postService.crearPost(this.post)
      if(creado) {
        this.post = {
          mensaje: '',
          coord: '',
          position: false
        };
        this.uiService.toastInformativo('Post creado exitosamente!', 'success');
        this.navCtrl.navigateRoot('/main/tabs/tab1');
      }
  }

   
  postGeo(){
    if(!this.post.position) {
      this.post.coord = null;
      return;
    }

    this.mostrarGeo = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.mostrarGeo = false;

      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.post.coord = coords;

     }).catch((error) => {
       console.log('Error getting location', error);
       this.mostrarGeo = false;
     });  

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
    });


    console.log(this.post)
  }
   


}
