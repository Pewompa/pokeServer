import mongoose from 'mongoose';

const indexSchema = new mongoose.Schema({
  indexes: {
    type: String,
    required: true,
  },
});
const indexModel = mongoose.model('index', indexSchema);
export default indexModel;
