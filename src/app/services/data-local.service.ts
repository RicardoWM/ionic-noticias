import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController
  ) { }

  saveNoticia( noticia: Article ) {

    const existe = this.noticias.find(n => n.title === noticia.title);

    if (!existe) {
      this.noticias.unshift( noticia );
      this.storage.set('favoritos', this.noticias);
      this.mostrarToast('Favorito guardado!')
    }

  }

  deleteNoticia( noticia: Article ) {
    this.noticias = this.noticias.filter(n => n.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.mostrarToast('Favorito eliminado!')
  }

  async loadFavoritos() {

    const favoritos = await this.storage.get('favoritos');

    if ( favoritos ) {
      this.noticias = favoritos;
    } else {
      this.noticias = [];
    }

  }

  async mostrarToast(message: string) {
  
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
    
  }
}
