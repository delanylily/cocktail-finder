import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, Subscription, switchMap } from 'rxjs';
import { CocktailService } from 'src/services/cocktail.service';

@Component({
  selector: 'cocktail-main',
  templateUrl: './cocktail-main.component.html',
  styleUrls: ['./cocktail-main.component.less']
})
export class CocktailMainComponent implements OnInit, OnDestroy {
  searchValue: Subject<string> = new Subject<string>();
  searchValueSubscription: Subscription;
  ingredient: string;
  ingredientsList: Array<any> = [];
  drinksArray: Array<any> = [];
  cocktailList: any;
  imageUrl: any;
  constructor(private readonly cocktailService: CocktailService) { }

  ngOnInit() {
    this.cocktailService.getImages('gin').subscribe(result => {
      this.createImageFromBlob(result);
      this.imageUrl = result;
    })
    this.findIngredients();
    this.searchValueSubscription = this.searchValue.pipe(
      map((value: string) => {
        this.ingredient = value;
      }),
      //   switchMap(() => this.getCocktails(this.ingredient));
      //   this.cocktailService.getCocktails(this.ingredient))
      // ).subscribe((data: any) => {
      //   console.log(data, 'data')
      // });
    ).subscribe()
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageUrl = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }



  getCocktails(value: any) {
    return this.cocktailService.getCocktails(value).subscribe((data: any) => {
      this.cocktailList = data;
    })
  }

  findCocktail(search: any): void {
    this.searchValue.next(search.target.value);
  }

  findIngredients(): void {
    this.cocktailService.getIngredients().subscribe(ingredients => {
      // this.ingredientsList.push(ingredients.drinks);
      // console.log(this.ingredientsList)
      this.ingredientsList = ingredients.drinks;
      console.log(this.ingredientsList, 'list')

    })
  }

  ngOnDestroy(): void {
    this.searchValueSubscription.unsubscribe();
  }

}
