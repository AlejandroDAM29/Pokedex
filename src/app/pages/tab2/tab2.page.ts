import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  ideas: string[]=['pikachu','charizard','bulbasaur','squirtle']
//Asasasaas
  offset=0;
  pokemon = [];
  value:string='';

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };


  constructor(private pokeService: PokemonService) {}



  //Cuando la barra de búsqueda cambia
  onSearchChange(e){
    this.value = e.detail.value;

    console.log("Valor",this.value)

    //Recibo la respuesta del servidor
    this.pokeService.findPokemon(this.value).subscribe(res =>{
      this.pokemon = [res];
    }, err =>{
      this.pokemon =[{
        pokeIndex:" No hay resultados para mostrar"
      }]
      
      console.log("No se encuentra el pokemon")
    });

  }




}
