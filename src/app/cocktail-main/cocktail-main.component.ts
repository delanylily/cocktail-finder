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
  images: string[] = [];
  popularSpirits: Array<any> = ['gin', 'vodka', 'rum', 'whisky'];

  constructor(private readonly cocktailService: CocktailService) { }

  ngOnInit() {
    this.getImages();
    this.findIngredients();
    this.searchValueSubscription = this.searchValue.pipe(
      map((value: string) => {
        this.ingredient = value;
      }),
    ).subscribe();
  }

  getImages(): void {
    for (let index = 0; index < this.popularSpirits.length; index++) {
      const element = this.popularSpirits[index];
      this.cocktailService.getImages(element).subscribe(result => {
        this.createImageFromBlob(result);
      });
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageUrl = reader.result;
      this.images.push(this.imageUrl);
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getCocktails(value: any) {
    return this.cocktailService.getCocktails(value).subscribe((data: any) => {
      this.cocktailList = data;
    });
  }

  findCocktail(search: any): void {
    this.searchValue.next(search.target.value);
  }

  findIngredients(): void {
    this.cocktailService.getIngredients().subscribe(ingredients => {
      this.ingredientsList = ingredients.drinks;
    });
  }

  ngOnDestroy(): void {
    this.searchValueSubscription.unsubscribe();
  }
}
