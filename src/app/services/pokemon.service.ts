import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

//URL que nunca cambia en la página
const baseUrl = environment.baseUrl;
const imageURL = environment.imageURL


@Injectable({
  providedIn: 'root'
})
export class PokemonService {




  constructor(private http: HttpClient) { }


  //Con el offset decimos los pokemon que se quedan fuera a la hora de contar con la lista general. Por defecto será 0
  getPokemon(offset = 0){
    //Hago que solamente aparezcan los resultados de los nombres y la imagen de los pokemon con MAP
    return this.http.get(`${baseUrl}pokemon?offset=${offset}&limit=25`).pipe(
      map(result =>{
        return result['results'];
      }),
      //Ahora, por cada pokemon obtenido del array obtenemos su imágen e índice
      map(pokemons =>{
        return pokemons.map((poke, index) =>{
          poke.image = this.getPokeImage(index+offset+1); //Es +1 porque todoas las imágenes empiezan desde 1, no de 0
          poke.pokeIndex = offset +index +1;
          return poke;
        });
      })
    )//Final del pipe
  }


  //Extraer imágen de los pokemon
  getPokeImage(index){
    return `${imageURL}${index}.png`
  }

  //Para encontrar un pokemon en el buscador
  findPokemon(search){
    return this.http.get(`${baseUrl}/pokemon/${search}`).pipe(
      map(pokemon => {
        pokemon['image'] = this.getPokeImage(pokemon['id']);
        pokemon['pokeIndex'] = pokemon['id'];
        return pokemon;
      })
    );
  }

}
