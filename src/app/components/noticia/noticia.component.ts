import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() i: number;
  @Input() enFavoritos: Boolean;

  constructor(
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private datalocalService: DataLocalService
  ) { }

  ngOnInit() {}

  openNew() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async moreOptions() {
    let buttonFavoritos;

    if (this.enFavoritos) {
      buttonFavoritos = {
        text: 'Eliminar favorito',
        icon: 'trash',
        handler: () => {
          this.datalocalService.deleteNoticia(this.noticia);
        }
      };
    } else {
      buttonFavoritos = {
        text: 'Favorito',
        icon: 'star',
        handler: () => {
          this.datalocalService.saveNoticia(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(this.noticia.title, this.noticia.source.name, '', this.noticia.url)
            .then(console.log)
            .catch(console.error)
        }
      },
      buttonFavoritos,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'rojo',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
