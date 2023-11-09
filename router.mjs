import express from 'express';
import { getPokemon, postNewPokemon } from './controllers.mjs';
const pokemonRouter = express.Router();

pokemonRouter.get('/pokemon/:id', getPokemon);

pokemonRouter.post('/pokemon/post', postNewPokemon);

export { pokemonRouter };
