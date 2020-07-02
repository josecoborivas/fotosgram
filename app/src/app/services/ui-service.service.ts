import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular'; 

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(public alertController: AlertController, private toastController: ToastController) { }

  async alertaInformativa(message: string) {
    const alert = await this.alertController.create({
      message,
      mode: 'ios',
      buttons: ['OK']
    });

    await alert.present();
  }

  async toastInformativo(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      color,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }
}
