import { UsuarioService } from './../../services/usuario.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userLogin: Usuario = {};
  public userRegister: Usuario = {};
  public loading: any;
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {}

  async login() {
    await this.presentLoading();

    try {
      await this.usuarioService.login(this.userLogin)

    } catch (error) {
      console.error(error);
      this.presentToast(error.message);

    }finally{

      this.loading.dismiss();
    }
  }
  async register() {

    await this.presentLoading();

    try {
      await this.usuarioService.register(this.userRegister)

    } catch (error) {
      console.error(error);
      this.presentToast(error.message);

    }finally{

      this.loading.dismiss();
    }

  }

  async presentLoading() {
     this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...',
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message, //recebe do parâmetro e salva na variável
      duration: 5000
    });
    toast.present();
  }

}
