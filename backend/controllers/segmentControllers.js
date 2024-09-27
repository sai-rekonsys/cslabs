const Segment = require('../models/segment');

// Create a new segment
exports.createSegment = async (req, res) => {
  try {
    const { segment_name, schemas } = req.body;

    const newSegment = new Segment({
      segment_name,
      schemas,
    });

    await newSegment.save();
    res.status(201).json({ message: 'Segment created successfully', segment: newSegment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all segments
exports.getSegments = async (req, res) => {
  try {
    const segments = await Segment.find();
    res.status(200).json(segments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
