import mongoose from 'mongoose';

const indexSchema = new mongoose.Schema({
  indexes: {
    type: String,
    unique: true,
    required: true,
  },
});
const indexModel = mongoose.model('indexes', indexSchema);
export default indexModel;
