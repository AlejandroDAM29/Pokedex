import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit  {

  offset = 0
  //Variable para almacenar los pokemon que recibo por respuesta
  pokemon = [];
  //Variable para hacer referencia al infiniteScroll del HTML
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;



  constructor(private pokeService: PokemonService) {}



  ngOnInit(){

    this.loadPokemon();
  }


  loadPokemon(loadMore = false, event?){
    setTimeout(() => {

      if(loadMore){
        this.offset +=25;
      }    
  
      this.pokeService.getPokemon(this.offset).subscribe(resp =>{
        console.log('results',resp);
        //Aquí se añaden los pokemons aue habían antes a los 25 que se reciben ahora.
        this.pokemon = [...this.pokemon, ...resp];      
      });
  
      if(event){
        event.target.complete();
      }
    },1000)

    //Si ya tenemos el offset con los 125 pokemon cargados, que pare el infinite scroll.
    if(this.offset == 125){
      this.infinite.disabled = true;
    }


  }


  



}
