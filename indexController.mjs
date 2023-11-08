import indexModel from './indexSchema.mjs';

async function getIndexes(req, res) {
  try {
    const array = await indexModel.find({});
    if (array.length === 0) {
      // If the array is empty, create a new document with an empty 'indexes' array
      const newDocument = new indexModel();
      await newDocument.save();
      res.status(200).json(newDocument);
    } else {
      res.status(200).json(array);
    }
  } catch (error) {
    console.log('Error fetching indexes: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getPokemon(req, res) {
  const pokemon = await indexModel.find();
  console.log(pokemon[0].indexes);
  try {
    res.status(200).json(pokemon[0].indexes);
  } catch (error) {
    console.log('Error fetching pokemon: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
async function pushPokemon(req, res) {
  const { name } = req.body;

  try {
    let document = await indexModel.findOne({});

    if (!document) {
      // If the document doesn't exist, create a new one
      document = new indexModel({ indexes: name });
    } else {
      // If the document exists, update the name
      document.indexes = name;
    }

    await document.save();
    res.status(200).json(document);
  } catch (error) {
    console.log('Error fetching or updating the pokemon: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function pushNewIndex(req, res) {
  try {
    const { index } = req.body; // Extract index from the request body
    // Find the document where you want to push the index
    const indexDocument = await indexModel.findOne({});
    if (!indexDocument) {
      // If the document doesn't exist, you can handle this situation accordingly
      return res.status(404).json({ message: 'Document not found' });
    }

    // Push the new index to the 'indexes' array
    indexDocument.indexes.push(index);

    // Save the updated document
    await indexDocument.save();

    return res.status(200).json(indexDocument);
  } catch (error) {
    console.log('Error pushing index: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getIndexes1() {
  try {
    const array = await indexModel.find({});
    if (array[0].length === 0) {
      // If the array is empty, create a new document with an empty 'indexes' array
      const newDocument = new indexModel();
      console.log('inside get');
      await newDocument.save();
      return newDocument;
    } else {
      if (array.length + 1 >= 100) {
        console.log('pokemon limit reached');
        return 'pokemon limit reached';
      }
      return array;
    }
  } catch (error) {
    console.log('Error getting indexes: ', error);
  }
}

const saveIndex = async (index) => {
  const indexDocument = await indexModel.findOne({});
  indexDocument.indexes.push(index);
  await indexDocument.save();
  return;
};

export function roundDownToNearestHour() {
  const now = new Date();
  return now.getHours();
}

let sharedIndex = {
  index: null,
  time: null,
};
console.log(sharedIndex);

const generateRandomPokemonIndex = async () => {
  let sharedTime = sharedIndex.time;
  console.log(sharedIndex);
  // console.log('shared index', typeof num);
  let rightNow = roundDownToNearestHour();
  console.log('right now', typeof rightNow);
  // console.log(rightNow == num);
  if (sharedTime == null || sharedTime !== rightNow) {
    // Add null check and compare the time
    console.log('not the same');
    sharedIndex.index = null;
    sharedIndex.time = null;
  }
  if (sharedIndex.index == null) {
    let indexArray = await getIndexes1();
    // return indexArray;
    sharedIndex.index = Math.ceil(Math.random() * 100);
    while (indexArray[0].indexes.includes(sharedIndex.index)) {
      sharedIndex.index = Math.ceil(Math.random() * 100);
      console.log('whiling: new index to try is', sharedIndex.index);
    }
    sharedIndex.time = rightNow;
    // console.log(indexArray[0].indexes);
    await saveIndex(sharedIndex.index);
    console.log('new index', sharedIndex.index);
  } else {
    console.log('shared index was the same');
  }
  console.log('shared index returning', sharedIndex.index);
  return sharedIndex;
};

// function runAtBeginningOfNextHour(callback) {
//   sharedIndex.index = null;
//   sharedIndex.time = null;
//   const now = new Date();
//   const nextHour = new Date(
//     now.getFullYear(),
//     now.getMonth(),
//     now.getDate(),
//     now.getHours() + 1,
//     0,
//     0,
//     0
//   );
//   console.log(Date.toString(nextHour));
//   console.log(Date.toString(now));

//   const timeUntilNextHour = nextHour - now;
//   console.log('time until next hour: ', timeUntilNextHour);

//   setTimeout(() => {
//     callback();
//     setInterval(callback, 60 * 60 * 1000); // Run every hour
//   }, timeUntilNextHour);
// }

// runAtBeginningOfNextHour(generateRandomPokemonIndex);

export {
  getIndexes,
  getPokemon,
  pushPokemon,
  pushNewIndex,
  generateRandomPokemonIndex,
  saveIndex,
  getIndexes1,
};
