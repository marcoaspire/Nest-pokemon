import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  // private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http:AxiosAdapter
  ){}

  async executeSeed(){
    let promiseArraytoInsert = [];
    // delete * from Pokemon
    await this.pokemonModel.deleteMany({}); 

    const data = await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=65`);
    data.results.forEach(async ({name,url}) => {
        const segments = url.split('/');
        const no = segments[segments.length-2];
        // 1
        // try {
        //   this.pokemonModel.create( {name, no} );
        // } catch (error) {
        //   this.handleExceptions( error );
        // }
        // Methos 2
        // promiseArraytoInsert.push(this.pokemonModel.create( {name, no} ));
        //3
        promiseArraytoInsert.push( {name, no} );

    });
    // 2
    // await Promise.all(promiseArraytoInsert);
    //3
    await this.pokemonModel.insertMany(promiseArraytoInsert);
    return data.results;
  }

  private handleExceptions( error: any ) {
    if ( error.code === 11000 ) {
      throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify( error.keyValue ) }`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }
  
}


