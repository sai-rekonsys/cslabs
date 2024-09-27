const express = require('express');
const router = express.Router();
const segmentController = require('../controllers/segmentControllers');

// POST route for creating a segment
router.post('/', segmentController.createSegment);

// GET route for fetching all segments
router.get('/', segmentController.getSegments);

module.exports = router;
