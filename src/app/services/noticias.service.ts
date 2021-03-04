import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage: number = 0;

  caegoriaActual = '';
  categoriaPage = 0;

  constructor(
    private http: HttpClient
  ) { }

  private ejecutarQuery<T>(query: string) {

    query = apiUrl + query;

    return this.http.get<T>(query, { headers })
  }

  getTopHeadlines() {
    this.headlinesPage++;
    // return this.http.get<RespuestaTopHeadlines>(`${apiUrl}&apiKey=${apiKey}`);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadlinesCategory(category: string) {
    if (this.caegoriaActual === category) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.caegoriaActual = category;
    }

    // return this.http.get<RespuestaTopHeadlines>(`${apiUrl}&category=${category}&apiKey=${apiKey}`);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${category}&page=${this.categoriaPage}`);
  }

}
