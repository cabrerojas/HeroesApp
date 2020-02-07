import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroesURL = 'https://heroesapp-1a1ed.firebaseio.com/heroes.json';
  heroeURL = 'https://heroesapp-1a1ed.firebaseio.com/heroes/';

  constructor( private http: HttpClient) { }


  nuevoHeroe(heroe: Heroe) {
    const body = JSON.stringify(heroe);
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    return this.http.post(this.heroesURL, body, { headers }).pipe(
      map(
        res => {
          console.log(res);
          return res;
        }
      )
    );
  }

  actualizarHeroe(heroe: Heroe, key$: string) {
    const body = JSON.stringify(heroe);
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    const url = `${this.heroeURL}/${ key$}.json`;

    return this.http.put(url, body, { headers }).pipe(
      map(
        res => {
          console.log(res);
          return res;
        }
      )
    );
  }

  getHeroe ( key$: string) {
    const URL = `${ this.heroeURL}/${key$}.json`;
    return this.http.get(URL).pipe(
      map( res => res)
    );
  }


  getHeroes () {
    return this.http.get(this.heroesURL).pipe(
      map( res => res)
    );
  }
  borrarHeroe(key$) {
    const url = `${this.heroeURL}/${key$}.json`;
    return this.http.delete(url).pipe(
      map(res => res)
    );
  }
}
