import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.MarvelComics,
    alter_ego: '',
    first_appearance: '',
    characters: ''
  }
  creadores = [
    {
      id: 'DC Comics',
      dec:  'dc-comics'
    },
    {
      id: 'Marvel Comics',
      dec:  'marvel-comics'
    }
  ]

  constructor(
      private heroesService: HeroesService,
      private activatedRoute: ActivatedRoute,
      private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroesService.getHeroe(id))
      ).subscribe( heroe => {
        this.heroe = heroe
        //console.log('Recuperado',  this.heroe)
      });
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }
    
    if (this.heroe.id) {
      this.heroesService.putHeroe(this.heroe)
      .subscribe( resp => {
        //console.log('Actualizando', resp);
      });
    } else {
      this.heroesService.postHeroe(this.heroe)
      .subscribe( resp => {
        //console.log('Crear', resp);
        this.router.navigate(['/heroes/editar/' + resp.id]);
      });
    }

   
  }

}
