import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {IonSlides, NavController} from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  slidePrincipalOptions = {
    allowTouchMove: false
  }

  loginUser = {
    email: 'josecoborivas@gmail.com',
    password: '123456'
  }

  registerUser: Usuario = {
    nombre: 'Test',
    password: '123456',
    email: 'test',
    avatar: 'av-1.png'
  }

  @ViewChild('slidePrincipal') slides: IonSlides;

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService) { }

  ngOnInit() {
  }

  goToResiter(){
    this.slides.slideTo(1, 500);
    
  }

  goToLogin(){
    this.slides.slidePrev();
  }

  async login(fLogin: NgForm){
    if(fLogin.invalid) return;

    const existe = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
    if(existe){
      //navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      //mostrar alerta de login incorrecto
      this.uiService.alertaInformativa('Usuario/Contraseña incorrectos.');
    }
  }

  async registro(fRegistro: NgForm){
    if(fRegistro.invalid) return;
    console.log(fRegistro.valid);

    const valido = await this.usuarioService.registro(this.registerUser);

    if(valido){
      //navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      //mostrar alerta de login incorrecto
      this.uiService.alertaInformativa(`El email: ${this.registerUser.email} ya existe.`);
    }
  }
}
