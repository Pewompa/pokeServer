import express from 'express';
import {
  getIndexes,
  pushNewIndex,
  getPokemon,
  pushPokemon,
} from './indexController.mjs';
const indexRouter = express.Router();

indexRouter.get('/indexes', getIndexes);
indexRouter.get('/pokemons', getPokemon);
indexRouter.post('/pokemons/post', pushPokemon);

indexRouter.post('/indexes/post/', pushNewIndex);

export { indexRouter };
