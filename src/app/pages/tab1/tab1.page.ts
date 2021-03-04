import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  noticias: Article[] = [];
  totalNotcicias: number = 0;
 
  constructor(
    private noticiasService: NoticiasService
  ) {}
  ngOnInit() {
    this.cargarNoticias();
  }

  async loadData() {
    if (this.noticias.length <= this.totalNotcicias) {
      await this.cargarNoticias();
      this.infiniteScroll.complete();
    } else {
      this.infiniteScroll.complete();
      this.infiniteScroll.disabled = true;
    }
  }

  cargarNoticias() {
    this.noticiasService.getTopHeadlines().subscribe(
      (resp) => {
        this.noticias.push( ...resp.articles );
        this.totalNotcicias = resp.totalResults;
      }
    );
  }

}
