import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {IonSlides, NavController} from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5,
    
  }

  slidePrincipalOptions = {
    allowTouchMove: false
  }

  loginUser = {
    email: 'josecoborivas@gmail.com',
    password: '123456'
  }

  @ViewChild('slidePrincipal') slides: IonSlides;

  constructor(private usuarioService: UsuarioService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  goToResiter(){
    this.slides.slideTo(1, 500);
    
  }

  goToLogin(){
    this.slides.slidePrev();
  }

  async login(fLogin: NgForm){
    const existe = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
    if(existe){
      //navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      //mostrar alerta de login incorrecto
    }
  }

  registro(fRegistro: NgForm){
    console.log(fRegistro.valid);

  }

  selectAvatar(avatar){
    this.avatars.forEach(avatar => avatar.seleccionado = false);
    avatar.seleccionado = true;
  }

}
