import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {IonSlides} from '@ionic/angular';

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

  @ViewChild('slidePrincipal') slides: IonSlides;

  constructor() { }

  ngOnInit() {
  }

  goToResiter(){
    this.slides.slideTo(1, 500);
    
  }

  goToLogin(){
    this.slides.slidePrev();
  }

  login(fLogin: NgForm){
    console.log(fLogin.valid);
  }

  registro(fRegistro: NgForm){
    console.log(fRegistro.valid);

  }

  selectAvatar(avatar){
    this.avatars.forEach(avatar => avatar.seleccionado = false);
    avatar.seleccionado = true;
  }

}
