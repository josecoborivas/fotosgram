import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { PostsService } from '../../services/posts.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Post } from '../../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

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
    private geolocation: Geolocation,
    private camera: Camera) {}

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
        this.tempImages = [];
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

  getPicture(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.procesarImagen(options);
  }


  procesarImagen(options: CameraOptions){
    this.camera.getPicture(options).then((imageData) => {
     
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      console.log(img)
      this.postService.subirImagen(imageData);
      this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  }

  libreria(){
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.procesarImagen(options);
  }
   


}
