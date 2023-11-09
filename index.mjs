import express from 'express';
import { connectDB } from './db.mjs';
import { pokemonRouter } from './router.mjs';
import { indexRouter } from './indexRouter.mjs';
import { createServer } from 'http';
import { config } from 'dotenv';
import cron from 'node-cron';
import { shuffledPokemonNames } from './pokemonList.mjs';
import cors from 'cors';

config();

(async () => {
  await connectDB();

  const app = express();
  app.use(cors());
  app.use(
    cors({
      origin: 'https://pokedle-psi.vercel.app', // Replace with your Vercel app's URL
    })
  );

  // const server = createServer(app);

  app.use(express.json());
  app.use(pokemonRouter);
  app.use(indexRouter);

  app.get('/', (req, res) => res.send('helllo'));
  const pokemonNames = [...shuffledPokemonNames];
  const currentPokemon = pokemonNames.shift();

  const username = 'bernatpavon'; // Replace with your actual username
  const password = 'ioEQ9sz8ZJihkLR5'; // Replace with your actual password

  const postPokemon = async (name) => {
    try {
      console.log('posting', name);
      const response = await fetch(
        `${process.env.API_BASE_URL}/pokemons/post`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          },
          body: JSON.stringify({
            name: name,
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return console.log('error posting pokemon: ', error);
    }
  };
  postPokemon(currentPokemon);

  cron.schedule('0 0 * * *', async () => {
    const currentPokemon = pokemonNames.shift();
    await postPokemon(currentPokemon);
  });

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
