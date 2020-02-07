import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { Heroe } from 'src/app/interfaces/heroe.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: any[] = [];
  loading = true;

  constructor(private _heroesService: HeroesService) {
    this._heroesService.getHeroes()
    .subscribe((data: any) => {

      setTimeout(() => {this.loading = false;
        this.heroes = data; } , 1000);


    });
   }

  ngOnInit() {
  }

  borraHeroe(key$: string) {
    this._heroesService.borrarHeroe(key$)
    .subscribe(respuesta => {
      console.log(respuesta);
      if (respuesta) {
        console.error(respuesta);
      } else {
        delete this.heroes[key$];
      }

    });
  }

}
