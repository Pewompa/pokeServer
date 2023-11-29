import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    unique: true,
  },
  dateCalled: {
    type: Date,
    default: Date.now,
  },
});
const pokemonModel = mongoose.model('pokemons', pokemonSchema);
export default pokemonModel;
