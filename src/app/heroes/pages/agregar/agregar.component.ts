import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';


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

  constructor() { }

  ngOnInit(): void {
  }

}
