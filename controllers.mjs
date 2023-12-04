// import pokemonModel from './schema.mjs';
import indexModel from './indexSchema.mjs';

// async function getPokemon(req, res) {
//   try {
//     const { id } = req.params;
//     const data = await pokemonModel.findOne({ id: id });
//     res.status(200).json(data);
//   } catch (error) {
//     console.log('error fetching pokemon: ', error);
//     res.status = 400;
//   }
// }

// async function postNewPokemon(req, res) {
//   try {
//     console.log('inside req.body', req.body);
//     const pokemon = new indexModel({
//       indexes: req.body.indexes,
//     });
//     await pokemon.save();
//     res.status = 201;
//     res.send(pokemon);
//   } catch (error) {
//     console.log('error posting pokemon: ', error)+
//     res.status = 400;
//   }
// }
async function postNewPokemon(req, res) {
  try {
    console.log('inside req.body', req.body);
    const query = { indexes: req.body.indexes };
    const update = { indexes: req.body.indexes }; // You can update other fields here if needed
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // const pokemon = await indexModel.findOneAndUpdate(query, update, options);
    const pokemon = new indexModel({
      indexes: req.body.name,
    });
    await pokemon.save();

    res.status(201).send(pokemon);
  } catch (error) {
    console.log('error posting pokemon: ', error);
    res.status(400).send(error);
  }
}

export { postNewPokemon };
