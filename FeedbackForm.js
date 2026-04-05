import React, { useState } from 'react';
import './FeedbackForm.css';

function FeedbackForm({ onSubmit }) {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert('Please write some feedback before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ message, category });
      setMessage('');
      setCategory('general');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const charCount = message.length;
  const maxChars = 500;

  return (
    <div className="feedback-form-container">
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-header">
          <h2>Share Your Feedback</h2>
          <p>Help us improve by sharing your thoughts</p>
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select"
          >
            <option value="general">General</option>
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="improvement">Improvement</option>
            <option value="praise">Praise</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Your Feedback
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, maxChars))}
            placeholder="Tell us what you think... (max 500 characters)"
            className="form-textarea"
            rows="5"
          />
          <div className="char-count">
            {charCount} / {maxChars}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !message.trim()}
          className="submit-button"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;
