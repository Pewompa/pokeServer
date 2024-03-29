import express from 'express';
import { connectDB } from './db.mjs';
import { pokemonRouter } from './router.mjs';
import { indexRouter } from './indexRouter.mjs';
import { createServer } from 'http';
import { config } from 'dotenv';
import cron from 'node-cron';
import { shuffledPokemonNames } from './pokemonList.mjs';
import cors from 'cors';
import indexModel from './indexSchema.mjs';

config();

(async () => {
  await connectDB();

  const app = express();
  app.use(cors());

  // const server = createServer(app);

  app.use(express.json());
  app.use(pokemonRouter);
  app.use(indexRouter);

  app.get('/', (req, res) => res.send('helllo'));
  const pokemonNames = [...shuffledPokemonNames];
  const lastPokemon = pokemonNames[0];
  const currentPokemon = pokemonNames.shift();

  const username = process.env.USERNAME; // Replace with your actual username
  const password = process.env.PASSWORD; // Replace with your actual password
  const postPokemon = async (name) => {
    console.log(`these are the username and password: ${username} ${password}`);
    try {
      await indexModel.collection.drop();
      const response = await fetch(
        `https://pokedleserver-0110db31efcd.herokuapp.com/pokemon/post`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          },
          body: JSON.stringify({ indexes: name }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return console.log('error posting pokemon in index.mjs: ', error);
    }
  };
  // if (currentPokemon) {
  //   console.log('posting ', currentPokemon);
  //   postPokemon(currentPokemon);
  // }
  // const checkIndexes = async () => {
  //   try {
  //     const indexes = await indexModel.collection.getIndexes();

  //     console.log('Indexes for the collection:');
  //     console.log(indexes);
  //     await indexModel.collection.dropIndex('names_1');
  //     console.log('Index "names_1" dropped successfully');
  //   } catch (error) {
  //     console.error('Error checking indexes:', error);
  //   }
  // };
  // checkIndexes();
  cron.schedule('0 0 * * *', async () => {
    console.log('croning');
    const currentPokemon = pokemonNames.shift();
    await postPokemon(currentPokemon);
  });

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
