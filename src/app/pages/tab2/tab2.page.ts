import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonInfiniteScroll, IonContent } from '@ionic/angular';
import { Article } from '../../interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;

  categories: any[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  noticias: Article[] = [];
  totalNotcicias: number = 0;
  category: string = '';
  

  constructor(
    private noticiasService: NoticiasService
  ) {}

  ngOnInit() {
    this.cargarNoticias(this.categories[0]);
  }

  segmentChanged(ev) {
    this.category = ev.detail.value;
    this.noticias = [];
    this.infiniteScroll.disabled = false;
    this.content.scrollToTop();
    this.cargarNoticias(this.category);
  }

  async loadData() {
    if (this.noticias.length <= this.totalNotcicias) {
      await this.cargarNoticias(this.category);
      this.infiniteScroll.complete();
    } else {
      this.infiniteScroll.complete();
      this.infiniteScroll.disabled = true;
    }
  }

  cargarNoticias(categoria: string) {
    this.noticiasService.getTopHeadlinesCategory(categoria).subscribe(
      (resp) => {
        this.noticias.push(...resp.articles);
        this.totalNotcicias = resp.totalResults;
      }
    );
  }

}
