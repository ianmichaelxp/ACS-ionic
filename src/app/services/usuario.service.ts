import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private auth: AngularFireAuth) {}

  login(usuario: Usuario) {
    return this.auth.signInWithEmailAndPassword(usuario.email, usuario.senha);
  }

  logout() {
    return this.auth.signOut();
  }

  register(usuario: Usuario) {
    return this.auth.createUserWithEmailAndPassword(
      usuario.email,
      usuario.senha
    );
  }

  getAuth() {
    return this.auth;
  }
}
