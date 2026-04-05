const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('client/build'));

// Data file path
const dataFile = path.join(__dirname, 'data', 'feedback.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Initialize data file if it doesn't exist
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([]));
}

// Helper functions
const readFeedback = () => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading feedback:', error);
    return [];
  }
};

const writeFeedback = (feedback) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(feedback, null, 2));
  } catch (error) {
    console.error('Error writing feedback:', error);
  }
};

// Routes

// GET all feedback
app.get('/api/feedback', (req, res) => {
  const feedback = readFeedback();
  res.json(feedback);
});

// POST new feedback
app.post('/api/feedback', (req, res) => {
  const { message, category } = req.body;

  // Validation
  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Feedback message cannot be empty' });
  }

  const feedback = readFeedback();
  const newFeedback = {
    id: Date.now().toString(),
    message: message.trim(),
    category: category || 'general',
    likes: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  feedback.push(newFeedback);
  writeFeedback(feedback);

  res.status(201).json(newFeedback);
});

// PUT update feedback
app.put('/api/feedback/:id', (req, res) => {
  const { id } = req.params;
  const { message, category, likes } = req.body;

  const feedback = readFeedback();
  const index = feedback.findIndex((f) => f.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Feedback not found' });
  }

  // Update fields
  if (message !== undefined && message.trim() !== '') {
    feedback[index].message = message.trim();
  }
  if (category !== undefined) {
    feedback[index].category = category;
  }
  if (likes !== undefined) {
    feedback[index].likes = likes;
  }

  feedback[index].updatedAt = new Date().toISOString();

  writeFeedback(feedback);
  res.json(feedback[index]);
});

// DELETE feedback
app.delete('/api/feedback/:id', (req, res) => {
  const { id } = req.params;

  const feedback = readFeedback();
  const index = feedback.findIndex((f) => f.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Feedback not found' });
  }

  const deleted = feedback.splice(index, 1);
  writeFeedback(feedback);

  res.json({ message: 'Feedback deleted', deleted: deleted[0] });
});

// LIKE feedback (increment likes)
app.post('/api/feedback/:id/like', (req, res) => {
  const { id } = req.params;

  const feedback = readFeedback();
  const item = feedback.find((f) => f.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Feedback not found' });
  }

  item.likes += 1;
  item.updatedAt = new Date().toISOString();

  writeFeedback(feedback);
  res.json(item);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Feedback Collector API is running' });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Feedback Collector server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
