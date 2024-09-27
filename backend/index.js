// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const segmentRoutes = require('./routes/segmentRoutes');

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Atlas connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB Atlas'))
// .catch((error) => console.error('MongoDB connection error:', error));

// // Routes
// app.use('/api/segments', segmentRoutes);

// app.listen(PORT, () => {
//   console.log(`Backend server running on http://localhost:3001`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Segment = require('./models/segment');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Route to handle segment creation
app.post('/api/segments', async (req, res) => {
  try {
    const { segment_name, schema } = req.body;
    
    const newSegment = new Segment({
      segment_name,
      schema
    });

    await newSegment.save();
    res.status(201).json({ message: 'Segment saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving segment', details: error });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
