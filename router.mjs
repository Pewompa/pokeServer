import express from 'express';
import { postNewPokemon } from './controllers.mjs';
const pokemonRouter = express.Router();

// pokemonRouter.get('/pokemon/:id', getPokemon);

pokemonRouter.put('/pokemon/post', postNewPokemon);

export { pokemonRouter };
