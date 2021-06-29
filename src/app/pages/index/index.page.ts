import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit() {}

  async logout() {
    try {
      await this.usuarioService.logout();
    } catch (err) {
      console.error(err);
    }
  }
}
