import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
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
      private router: Router,
      private _snackBar: MatSnackBar,
      private dialog: MatDialog) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      return;
    }

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
        this.mostrar('Registro ctualizando');
      });
    } else {
      this.heroesService.postHeroe(this.heroe)
      .subscribe( resp => {
        //console.log('Crear', resp);
        this.router.navigate(['/heroes/editar/' + resp.id]);
        this.mostrar('Registro creado');
      });
    }
  }

  borrar(){

    const dialog =this.dialog.open(ConfirmarComponent, {
      width: '400px',
      data: { ...this.heroe }
    });

    dialog.afterClosed()
      .subscribe(resp => {
        //console.log(resp)
        if(resp){
          this.heroesService.deleteHeroe(this.heroe.id!)
          .subscribe(reps =>
              this.router.navigate(['/heroes'])
            );
        }
      })
  }

  mostrar(mensaje: string){
    this._snackBar.open(mensaje, 'ok!', {
      duration:2500,
    });
  }

}
