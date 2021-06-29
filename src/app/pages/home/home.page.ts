import { ToastController } from '@ionic/angular';
import { UsuarioService } from './../../services/usuario.service';
import { RecordService } from './../../services/record.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Record } from 'src/app/models/record';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  public records = new Array<Record>();
  private recordSubscription: Subscription;
  private loading: any;

  constructor(
    private toastController: ToastController,
    private recordService: RecordService,
    private usuarioService: UsuarioService
  ) {
    this.recordSubscription = this.recordService
      .getRecords()
      .subscribe((data) => {
        this.records = data;
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.recordSubscription.unsubscribe();
  }

  async logout() {
    try {
      await this.usuarioService.logout();
    } catch (err) {
      console.error(err);
    }
  }

  async deleteRecord(id: string) {
    try {
      await this.recordService.deleteRecord(id);
      console.log(id);
    } catch (err) {
      this.presentToast('Erro ao tentar excluir');
      console.error(err);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message, //recebe do parâmetro e salva na variável
      duration: 5000,
    });
    toast.present();
  }
}
