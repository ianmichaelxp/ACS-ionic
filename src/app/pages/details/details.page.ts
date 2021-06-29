import { RecordService } from './../../services/record.service';
import { Subscription } from 'rxjs';
import { UsuarioService } from './../../services/usuario.service';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Record } from 'src/app/models/record';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy {
  public record: Record = {};
  private loading: any;
  public recordId: string = null;
  private recordSubscription: Subscription;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private usuarioService: UsuarioService,
    private activeRoute: ActivatedRoute,
    private recordService: RecordService,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.recordId = this.activeRoute.snapshot.params['id'];
    if (this.recordId) this.loadRecord();
  }

  ngOnDestroy() {
    if (this.recordSubscription) this.recordSubscription.unsubscribe();
  }

  loadRecord() {
    this.recordSubscription = this.recordService
      .getRecord(this.recordId)
      .subscribe((data) => {
        this.record = data;
      });
  }

  async saveRecord() {
    await this.presentLoading();
    this.record.usuarioId = (
      await this.usuarioService.getAuth().currentUser
    ).uid;

    if (this.recordId) {

      try {
        await this.recordService.updateRecord(this.recordId, this.record);
        await this.loading.dismiss();
        this.navController.navigateBack('/home');
      } catch (err) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
        console.error(err);
      }
    } else {
      this.record.data = new Date().getTime();

      try {
        await this.recordService.addRecord(this.record);
        await this.loading.dismiss();
        this.navController.navigateBack('/home');
      } catch (err) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
        console.error(err);
      }
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
      duration: 5000,
    });
    toast.present();
  }
}
