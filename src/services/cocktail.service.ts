import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CocktailService {
  url: string = 'https://www.thecocktaildb.com/api/json/v1/1/'
  images: string = 'https://www.thecocktaildb.com/images/ingredients/'

  alcoholFilter: string = 'filter.php?i=';
  ingredients: string = 'list.php?i=list';

  constructor(private http: HttpClient) { }

  getCocktails(alcohol: string): Observable<any> {
    return this.http.get(`${this.url}${this.alcoholFilter}${alcohol}`);
  }

  getIngredients(): Observable<any> {
    return this.http.get(`${this.url}${this.ingredients}`)
  }

  getImages(ingredient: string): Observable<any> {
    return this.http.get(`${this.images}${ingredient}-Medium.png`, { responseType: 'blob' });
  }
}
