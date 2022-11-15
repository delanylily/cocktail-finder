import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CocktailService {
  url: string = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='

  constructor(private http: HttpClient) { }
  // https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin

  getCocktails(alcohol: string) {
    return this.http.get(`${this.url}${alcohol}`);
  }
}
