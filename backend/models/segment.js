

// const mongoose = require('mongoose');

// const schemaSchema = new mongoose.Schema({
//   key: String,
//   label: String,
// });

// const segmentSchema = new mongoose.Schema({
//   segment_name: { type: String, required: true },
//   schemas: [schemaSchema],
// });

// const Segment = mongoose.model('Segment', segmentSchema);

// module.exports = Segment;

const mongoose = require('mongoose');

const schemaSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  gender: String,
  age: String,
  account_name: String,
  city: String,
  state: String,
});

const segmentSchema = new mongoose.Schema({
  segment_name: {
    type: String,
    required: true,
  },
  schema: [
    {
      type: Map,
      of: String,
    }
  ],
});

const Segment = mongoose.model('Segment', segmentSchema);

module.exports = Segment;
