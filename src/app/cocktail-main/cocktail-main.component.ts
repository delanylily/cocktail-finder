import { Component, OnInit } from '@angular/core';
import { CocktailService } from 'src/services/cocktail.service';

@Component({
  selector: 'cocktail-main',
  templateUrl: './cocktail-main.component.html',
  styleUrls: ['./cocktail-main.component.less']
})
export class CocktailMainComponent implements OnInit {

  constructor(private readonly cocktailService: CocktailService) { }

  ngOnInit() {
    this.cocktailService.getCocktails('Gin').subscribe(result => {
      console.log(result, 'result');
    })
  }

}
