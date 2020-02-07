import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from 'src/app/services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: Heroe = {
    nombre: '',
    bio: '',
    casa: 'Marvel'
  };

  nuevo = false;
  id: string;

  constructor(private _heroeservice: HeroesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

                this.activatedRoute.params
                .subscribe( parametros => {this.id = parametros['id'];
                if (this.id !== 'nuevo') {
                  this._heroeservice.getHeroe(this.id)
                  .subscribe((heroe: any) => this.heroe = heroe);

                }

              });
  }

  ngOnInit() {
  }

  guardar() {
    console.log(this.heroe);

    if (this.id === 'nuevo') {
      // Insetando
      this._heroeservice.nuevoHeroe(this.heroe)
      .subscribe( (data: any) => {
        this.router.navigate(['/heroe', data.name ]);
      } ,
      error => console.error(error));

    } else {
      // actualizando
      this._heroeservice.actualizarHeroe(this.heroe, this.id)
      .subscribe( data => {
        console.log(data);
      } ,
      error => console.error(error));

    }
  }

  agregarNuevo(forma: NgForm) {
    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      casa: 'Marvel'
    });
  }


}
