// const mongoose = require('mongoose');

// const formDataSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   optionalField: {
//     type: String
//   }
// });

// const FormData = mongoose.model('FormData', formDataSchema);

// module.exports = FormData;


const mongoose = require('mongoose');

const footballPlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  club: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  goals_scored: {
    type: Number,
    required: true
  }
});

const FootballPlayer = mongoose.model('FootballPlayer', footballPlayerSchema);

module.exports = FootballPlayer;
